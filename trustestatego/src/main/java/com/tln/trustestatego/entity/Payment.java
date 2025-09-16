package com.tln.trustestatego.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name = "payment", indexes = {
        @Index(name = "user_id", columnList = "user_id"),
        @Index(name = "package_id", columnList = "package_id")
})
public class Payment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "amount", precision = 15, scale = 2)
    private BigDecimal amount;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "package_id")
    private Package packageField;

    @Column(name = "payment_method", length = 50)
    private String paymentMethod;

//    @Column(name = "transaction_id", length = 100)
//    private String transactionId;

    @Column(name = "is_pay")
    private Boolean isPay;

    @Column(name = "expired_at")
    private LocalDateTime expiredAt;

    @Column(name = "paid_at")
    private LocalDateTime paidAt;

    // PayPal Order ID
    @Column(name = "order_id", length = 100)
    private String orderId;

    // PayPal Capture ID
    @Column(name = "capture_id", length = 100)
    private String captureId;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    // Auto set khi update
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

}