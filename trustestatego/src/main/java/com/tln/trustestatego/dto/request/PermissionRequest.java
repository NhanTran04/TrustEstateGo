package com.tln.trustestatego.dto.request;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class PermissionRequest {
    @NotBlank(message = "Permission name must not be blank")
    @Size(max = 100, message = "Permission name must not exceed 100 characters")
    String name;

    @Size(max = 255, message = "Permission description must not exceed 255 characters")
    String description;
}
