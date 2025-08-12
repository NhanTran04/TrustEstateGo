package com.tln.trustestatego.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class PropertySaveResponse {
    private int id;
    private int userId;
    private PropertyResponse propertyResponse;
}
