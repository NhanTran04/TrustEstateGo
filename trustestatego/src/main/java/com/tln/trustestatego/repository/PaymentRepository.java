package com.tln.trustestatego.repository;

import com.tln.trustestatego.entity.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface PaymentRepository extends JpaRepository<Payment, Integer> {
    Optional<Payment> findByOrderId(String orderId);
    List<Payment> findByUserId(Integer userId);
    @Query("SELECT MONTH(p.paidAt), SUM(p.amount) " +
            "FROM Payment p " +
            "WHERE p.isPay = true AND YEAR(p.paidAt) = :year " +
            "GROUP BY MONTH(p.paidAt) ORDER BY MONTH(p.paidAt)")
    List<Object[]> getRevenueByMonthRaw(int year);
}