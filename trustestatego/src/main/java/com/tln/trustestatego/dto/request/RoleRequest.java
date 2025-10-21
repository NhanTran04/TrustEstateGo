package com.tln.trustestatego.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class RoleRequest {
    @NotBlank(message = "Role name must not be blank")
    @Size(max = 100, message = "Role name must not exceed 100 characters")
    private String name;
    @Size(max = 255, message = "Description must not exceed 255 characters")
    private String description;
    @NotEmpty(message = "At least one permission is required")
    Set<Integer> permissions;
}
