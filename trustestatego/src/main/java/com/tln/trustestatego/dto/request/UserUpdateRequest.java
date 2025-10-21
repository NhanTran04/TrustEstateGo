package com.tln.trustestatego.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserUpdateRequest {
    @Size(max = 50, message = "First name cannot exceed 50 characters")
    String firstName;

    @Size(max = 50, message = "Last name cannot exceed 50 characters")
    String lastName;

    Boolean gender;
    LocalDate birthday;
    @Email(message = "Invalid email format")
    String email;
    String address;
    @Pattern(regexp = "^(0|\\+84)[0-9]{9,10}$", message = "Invalid Vietnamese phone number format")
    String phone;
    @Size(min = 6, message = "Password must be at least 6 characters long")
    String password;
    MultipartFile avatar;
    Boolean isActive;
    Set<Integer> roleId;
}
