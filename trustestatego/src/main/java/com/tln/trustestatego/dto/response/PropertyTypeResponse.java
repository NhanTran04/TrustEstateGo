package com.tln.trustestatego.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class PropertyTypeResponse {
    private String value;
    private String label;
    private String description;
}
