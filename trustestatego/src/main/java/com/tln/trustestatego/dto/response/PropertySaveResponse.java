package com.tln.trustestatego.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class PropertySaveResponse {
    int id;
    int propertyId;
    BigDecimal propertyPrice;
    String propertyLocation;
    String propertyTitle;
    String propertyImage;
    Integer propertyArea;
    Integer propertyBedroom;
    String propertyInterior;
    String categoryName;
    LocalDateTime propertyCreatedAt;
}
