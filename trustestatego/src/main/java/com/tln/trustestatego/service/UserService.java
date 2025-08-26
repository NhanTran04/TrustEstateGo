package com.tln.trustestatego.service;

import com.tln.trustestatego.dto.request.UserCreationRequest;
import com.tln.trustestatego.dto.request.UserUpdateRequest;
import com.tln.trustestatego.dto.response.PageResponse;
import com.tln.trustestatego.dto.response.UserResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface UserService {
    PageResponse<UserResponse> getUsers(String kw, Pageable pageable);
    UserResponse getUserById(int userId);
    UserResponse createUser(UserCreationRequest userCreationRequest);
    UserResponse updateUser(int userId, UserUpdateRequest userUpdateRequest);
    void deleteUser(int userId);
}
