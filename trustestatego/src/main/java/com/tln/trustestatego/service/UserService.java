package com.tln.trustestatego.service;

import com.tln.trustestatego.dto.request.UserCreationRequest;
import com.tln.trustestatego.dto.request.UserUpdateRequest;
import com.tln.trustestatego.dto.response.UserResponse;

import java.util.List;

public interface UserService {
    public List<UserResponse> getUsers();
    public UserResponse getUserById(int userId);
    public UserResponse createUser(UserCreationRequest userCreationRequest);
    public UserResponse updateUser(int userId, UserUpdateRequest userUpdateRequest);
    public void deleteUser(int userId);
}
