package com.tln.trustestatego.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserResponse {
    int id;
    String firstName;
    String lastName;
    String gender;
    LocalDate birthday;
    String email;
    String address;
    String phone;
    String username;
    String password;
    String avatar;
    Boolean isActive;
    Set<RoleResponse> roles;
}
