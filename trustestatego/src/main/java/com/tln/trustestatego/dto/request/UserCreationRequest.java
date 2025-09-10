package com.tln.trustestatego.dto.request;

import jakarta.persistence.Column;
import jakarta.persistence.Lob;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.hibernate.annotations.ColumnDefault;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserCreationRequest {
    String firstName;
    String lastName;
    Boolean gender;
    LocalDate birthday;
    String email;
    String address;
    String phone;

    @NotBlank(message = "Username is required")
    String username;

    @NotBlank(message = "Password is required")
    String password;

    MultipartFile avatar;

    @Builder.Default
    Boolean isActive = true;

    @NotNull(message = "Role ID is required")
    Integer roleId;
}
