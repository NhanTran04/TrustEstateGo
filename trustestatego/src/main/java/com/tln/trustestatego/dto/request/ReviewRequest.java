package com.tln.trustestatego.dto.request;

import jakarta.validation.constraints.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ReviewRequest {
    @NotNull(message = "Rating is required")
    @Min(value = 1, message = "Rating must be at least 1")
    @Max(value = 5, message = "Rating must not exceed 5")
    int rating;
    @NotBlank(message = "Comment is required")
    @Size(max = 500, message = "Comment must not exceed 500 characters")
    String comment;
//    int buyerId;
    @NotNull(message = "Seller ID is required")
    @Min(value = 1, message = "Seller ID must be greater than 0")
    int sellerId;
//    int propertyId;
}
