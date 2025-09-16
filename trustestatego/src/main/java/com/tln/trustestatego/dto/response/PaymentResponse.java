package com.tln.trustestatego.dto.response;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class PaymentResponse {
    Integer id;
    BigDecimal amount;
    String paymentMethod;
    Boolean isPay;
    LocalDateTime paidAt;
    String orderId;
    String captureId;
    String packageName;
    BigDecimal packagePrice;
    String approvalLink;
}
