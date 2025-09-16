package com.tln.trustestatego.repository;

import com.tln.trustestatego.entity.Payment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PaymentRepository extends JpaRepository<Payment, Integer> {
    Optional<Payment> findByOrderId(String orderId);
    List<Payment> findByUserId(Integer userId);
}