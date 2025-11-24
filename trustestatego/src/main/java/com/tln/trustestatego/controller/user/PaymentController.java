package com.tln.trustestatego.controller.user;

import com.tln.trustestatego.dto.response.PaymentResponse;
import com.tln.trustestatego.service.PaymentService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/payments")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class PaymentController {

    PaymentService paymentService;

    @PreAuthorize("hasRole('SELLER')")
    @PostMapping("/create/{packageId}")
    public PaymentResponse createOrder(@PathVariable Integer packageId) throws Exception {
        return paymentService.createOrder(packageId);
    }

    @PreAuthorize("hasRole('SELLER')")
    @PostMapping("/capture/{orderId}")
    public PaymentResponse captureOrder(@PathVariable String orderId) throws Exception {
        return paymentService.captureOrder(orderId);
    }

    @PreAuthorize("hasRole('SELLER')")
    @PostMapping("/history")
    public List<PaymentResponse> getPaymentsByUser(){
        return paymentService.getPaymentsByUser();
    }

    @PreAuthorize("hasRole('SELLER')")
    @GetMapping("/allow-buy")
    public boolean allowBuy() {
        return paymentService.allowBuy();
    }

    @PreAuthorize("hasRole('SELLER')")
    @DeleteMapping("/payments/cancel/{orderId}")
    public ResponseEntity<Void> cancelPayment(@PathVariable String orderId) {
        paymentService.deletePayment(orderId);
        return ResponseEntity.noContent().build();
    }
}
