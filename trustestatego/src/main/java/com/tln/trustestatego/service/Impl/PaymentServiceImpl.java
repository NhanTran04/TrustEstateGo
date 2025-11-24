package com.tln.trustestatego.service.Impl;

import com.paypal.core.PayPalHttpClient;
import com.paypal.http.HttpResponse;
import com.paypal.http.exceptions.HttpException;
import com.paypal.orders.*;
import com.tln.trustestatego.dto.response.PaymentResponse;
import com.tln.trustestatego.entity.Package;
import com.tln.trustestatego.entity.Payment;
import com.tln.trustestatego.entity.User;
import com.tln.trustestatego.mapper.PaymentMapper;
import com.tln.trustestatego.repository.PackageRepository;
import com.tln.trustestatego.repository.PaymentRepository;
import com.tln.trustestatego.service.CurrentUserService;
import com.tln.trustestatego.service.PaymentService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class PaymentServiceImpl implements PaymentService {
    private final PayPalHttpClient payPalClient;
    private final PaymentRepository paymentRepository;
    private final PackageRepository packageRepository;
    private final CurrentUserService currentUserService;
    private final PaymentMapper paymentMapper;

    @Value("${paypal.success-url}")
    private String successUrl;

    @Value("${paypal.cancel-url}")
    private String cancelUrl;

    @Value("${paypal.currency}")
    private String currency;

    @Override
    public PaymentResponse createOrder(Integer packageId) throws IOException {
        User user = currentUserService.getCurrentUser();
        Package pkg = packageRepository.findById(packageId)
                .orElseThrow(() -> new IllegalArgumentException("Package not found"));

        // Tạo order request PayPal
        OrderRequest orderRequest = new OrderRequest();
        orderRequest.checkoutPaymentIntent("CAPTURE");

        ApplicationContext applicationContext = new ApplicationContext()
                .returnUrl(successUrl)
                .cancelUrl(cancelUrl)
                .brandName("TrustEstateGo")
                .landingPage("NO_PREFERENCE")
                .userAction("PAY_NOW");

        BigDecimal vndPrice = pkg.getPrice(); // ví dụ: 200000 (VND)
        BigDecimal usdPrice = vndPrice.divide(new BigDecimal("24000"), 2, RoundingMode.HALF_UP);

        PurchaseUnitRequest purchaseUnitRequest = new PurchaseUnitRequest()
//                .customId(packageId.toString())// them vao neu muon luu chi khi thanh toan thanh cong
//                .referenceId(String.valueOf(packageId))
                .amountWithBreakdown(new AmountWithBreakdown()
                        .currencyCode(currency)
                        .value(usdPrice.toPlainString()));

        orderRequest.applicationContext(applicationContext);
        orderRequest.purchaseUnits(List.of(purchaseUnitRequest));

        OrdersCreateRequest request = new OrdersCreateRequest().requestBody(orderRequest);
        HttpResponse<Order> response = payPalClient.execute(request);
        Order order = response.result();

        // Lấy approvalLink
        String approvalLink = order.links().stream()
                .filter(link -> "approve".equals(link.rel()))
                .findFirst()
                .map(LinkDescription::href)
                .orElse(null);

        // Lưu DB
//        Payment payment = new Payment();
//        payment.setUser(user);
//        payment.setPackageField(pkg);
//        payment.setAmount(pkg.getPrice());
//        payment.setPaymentMethod("PAYPAL");
//        payment.setOrderId(order.id());
//        payment.setIsPay(false);
//        payment.setCreatedAt(LocalDateTime.now());
//
//        Payment savedPayment = paymentRepository.save(payment);
//
//        PaymentResponse paymentResponse = paymentMapper.toResponse(savedPayment);
//        paymentResponse.setApprovalLink(approvalLink);

        Payment temp = new Payment();
        temp.setUser(user);
        temp.setPackageField(pkg);
        temp.setOrderId(order.id());
        temp.setIsPay(false);
        temp.setCreatedAt(LocalDateTime.now());
        paymentRepository.save(temp);

        PaymentResponse paymentResponse = new PaymentResponse();
        paymentResponse.setApprovalLink(approvalLink);
        paymentResponse.setOrderId(order.id());

        return paymentResponse;
    }

//    @Override
//    public PaymentResponse captureOrder(String orderId) throws IOException {
//        Payment payment = paymentRepository.findByOrderId(orderId)
//                .orElseThrow(() -> new IllegalArgumentException("Payment not found"));
//        // Nếu đã thanh toán rồi thì không gọi PayPal nữa
//        if (Boolean.TRUE.equals(payment.getIsPay())) {
//            return paymentMapper.toResponse(payment);
//        }
//        try {
//            OrdersCaptureRequest request = new OrdersCaptureRequest(orderId);
//            HttpResponse<Order> response = payPalClient.execute(request);
//            Order order = response.result();
//
//            String captureId = order.purchaseUnits()
//                    .get(0).payments().captures().get(0).id();
//
//
//            if ("COMPLETED".equals(order.status())) {
//                payment.setIsPay(true);
//            } else {
//                throw new IllegalStateException("Payment not completed: " + order.status());
//            }
//            payment.setCaptureId(captureId);
//            payment.setPaidAt(LocalDateTime.now());
//            payment.setUpdatedAt(LocalDateTime.now());
//
//            Payment updatedPayment = paymentRepository.save(payment);
//
//            return paymentMapper.toResponse(updatedPayment);
//
//        } catch (HttpException e) {
//            if (e.getMessage().contains("ORDER_ALREADY_CAPTURED")) {
//                // lấy record Payment từ DB trả về cho frontend
//                return paymentMapper.toResponse(payment);
//            }
//            throw e;
//        }
//    }

    @Override
    public PaymentResponse captureOrder(String orderId) throws IOException {
        Payment existing = paymentRepository.findByOrderId(orderId).orElse(null);
        if (existing != null && Boolean.TRUE.equals(existing.getIsPay())) {
            return paymentMapper.toResponse(existing);
        }

        try {
            OrdersCaptureRequest request = new OrdersCaptureRequest(orderId);
            HttpResponse<Order> response = payPalClient.execute(request);
            Order order = response.result();

            if (!"COMPLETED".equals(order.status())) {
                throw new IllegalStateException("Payment not completed");
            }

            Package pkg = existing.getPackageField();

            String captureId = order.purchaseUnits().get(0)
                    .payments().captures().get(0).id();

            existing.setIsPay(true);
            existing.setCaptureId(captureId);
            existing.setPaidAt(LocalDateTime.now());
            existing.setExpiredAt(LocalDateTime.now().plusDays(pkg.getDuration()));
            existing.setUpdatedAt(LocalDateTime.now());

            Payment saved = paymentRepository.save(existing);

            return paymentMapper.toResponse(saved);

        } catch (HttpException e) {

            // TH1: ORDER_ALREADY_CAPTURED → trả payment đã lưu
            if (e.getMessage().contains("ORDER_ALREADY_CAPTURED")) {
                Payment already = paymentRepository.findByOrderId(orderId)
                        .orElseThrow(() -> new IllegalStateException("Order captured but not saved!"));
                return paymentMapper.toResponse(already);
            }

            throw e;
        }
    }

    @Override
    public List<PaymentResponse> getPaymentsByUser() {
        User user = currentUserService.getCurrentUser();
        return paymentRepository.findByUserId(user.getId())
                .stream()

                .map(paymentMapper::toResponse)
                .toList();
    }

    @Override
    public void deletePayment(String orderId) {
        paymentRepository.findByOrderId(orderId).ifPresent(paymentRepository::delete);
    }

    @Override
    public boolean allowBuy() {
        User user = currentUserService.getCurrentUser();
        return !paymentRepository.existsByUserIdAndIsPayTrueAndExpiredAtAfter(user.getId(), LocalDateTime.now());
    }
}