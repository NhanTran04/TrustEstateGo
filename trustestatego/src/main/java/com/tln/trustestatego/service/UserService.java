package com.tln.trustestatego.service;

import com.tln.trustestatego.dto.request.UserCreationRequest;
import com.tln.trustestatego.dto.request.UserUpdateRequest;
import com.tln.trustestatego.dto.response.UserResponse;

import java.util.List;

public interface UserService {
    List<UserResponse> getUsers();
    UserResponse getUserById(int userId);
    UserResponse createUser(UserCreationRequest userCreationRequest);
    UserResponse updateUser(int userId, UserUpdateRequest userUpdateRequest);
    void deleteUser(int userId);
}
