package com.tln.trustestatego.service;

import com.tln.trustestatego.dto.response.PaymentResponse;

import java.io.IOException;
import java.util.List;

public interface PaymentService {
    PaymentResponse createOrder(Integer packageId) throws IOException;
    PaymentResponse captureOrder(String orderId) throws IOException;
    List<PaymentResponse> getPaymentsByUser();
}
