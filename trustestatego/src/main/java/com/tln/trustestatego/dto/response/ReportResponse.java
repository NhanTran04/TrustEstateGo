package com.tln.trustestatego.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ReportResponse {
    int userId;
    int propertyId;
    String propertyName;
    //String propertyImage;
    String reason;
    String status;
}
