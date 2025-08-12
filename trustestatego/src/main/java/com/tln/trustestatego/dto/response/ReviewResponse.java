package com.tln.trustestatego.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ReviewResponse {
    int id;
    int rating;
    String comment;
    int buyerId;
    int sellerId;
    int propertyId;
    LocalDateTime createdAt;
}
