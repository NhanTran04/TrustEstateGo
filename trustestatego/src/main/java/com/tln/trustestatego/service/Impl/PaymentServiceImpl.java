package com.tln.trustestatego.service.Impl;

import com.paypal.core.PayPalHttpClient;
import com.paypal.http.HttpResponse;
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
        Payment payment = new Payment();
        payment.setUser(user);
        payment.setPackageField(pkg);
        payment.setAmount(pkg.getPrice());
        payment.setPaymentMethod("PAYPAL");
        payment.setOrderId(order.id());
        payment.setIsPay(false);
        payment.setCreatedAt(LocalDateTime.now());

        Payment savedPayment = paymentRepository.save(payment);

        PaymentResponse paymentResponse = paymentMapper.toResponse(savedPayment);
        paymentResponse.setApprovalLink(approvalLink);
        return paymentResponse;
    }

    @Override
    public PaymentResponse captureOrder(String orderId) throws IOException {
        OrdersCaptureRequest request = new OrdersCaptureRequest(orderId);
        HttpResponse<Order> response = payPalClient.execute(request);
        Order order = response.result();

        String captureId = order.purchaseUnits()
                .get(0).payments().captures().get(0).id();

        Payment payment = paymentRepository.findByOrderId(orderId)
                .orElseThrow(() -> new IllegalArgumentException("Payment not found"));

        payment.setIsPay(true);
        payment.setCaptureId(captureId);
        payment.setPaidAt(LocalDateTime.now());
        payment.setUpdatedAt(LocalDateTime.now());

        Payment updatedPayment = paymentRepository.save(payment);

        return paymentMapper.toResponse(updatedPayment);
    }

    @Override
    public List<PaymentResponse> getPaymentsByUser() {
        User user = currentUserService.getCurrentUser();
        return paymentRepository.findByUserId(user.getId())
                .stream()
                .map(paymentMapper::toResponse)
                .toList();
    }
}