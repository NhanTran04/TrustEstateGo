package com.tln.trustestatego.dto.request;

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
    String firstName;
    String lastName;
    String gender;
    LocalDate birthday;
    String email;
    String address;
    String phone;
    String password;
    MultipartFile avatar;
    Boolean isActive;
    int roleId;
}
