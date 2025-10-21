package com.tln.trustestatego.dto.request;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class PropertySaveRequest {
    @NotNull(message = "Property ID is required")
    @Min(value = 1, message = "Property ID must be greater than 0")
    int propertyId;
}
