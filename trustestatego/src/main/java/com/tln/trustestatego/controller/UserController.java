package com.tln.trustestatego.controller;

import com.tln.trustestatego.dto.request.UserCreationRequest;
import com.tln.trustestatego.dto.request.UserUpdateRequest;
import com.tln.trustestatego.dto.response.ApiResponse;
import com.tln.trustestatego.dto.response.UserResponse;
import com.tln.trustestatego.service.Impl.UserServiceImpl;
import com.tln.trustestatego.service.UserService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/users")
@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class UserController {
    UserService userService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<UserResponse>>> getUsers() {
        try {
            return ResponseEntity.ok(
                    ApiResponse.<List<UserResponse>>builder()
                            .result(userService.getUsers())
                            .build()
            );
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ApiResponse.<List<UserResponse>>builder()
                            .message("Lỗi khi lấy danh sách user: " + e.getMessage())
                            .build());
        }
    }

    @GetMapping("/{userId}")
    public ResponseEntity<ApiResponse<UserResponse>> getUserById(@PathVariable int userId) {
        try {
            return ResponseEntity.ok(
                    ApiResponse.<UserResponse>builder()
                            .result(userService.getUserById(userId))
                            .build()
            );
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(ApiResponse.<UserResponse>builder()
                            .message("Không tìm thấy user Id: " + userId)
                            .build());
        }
    }

    @PostMapping
    public ResponseEntity<ApiResponse<UserResponse>> createProperty(@RequestBody UserCreationRequest userCreationRequest) {
        try {
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(ApiResponse.<UserResponse>builder()
                            .result(userService.createUser(userCreationRequest))
                            .message("Tạo bất động sản thành công")
                            .build());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(ApiResponse.<UserResponse>builder()
                            .message("Lỗi khi tạo bất động sản: " + e.getMessage())
                            .build());
        }
    }

    @PutMapping("/{userId}")
    public ResponseEntity<ApiResponse<UserResponse>> updateProperty(
            @PathVariable int userId,
            @RequestBody UserUpdateRequest userUpdateRequest) {
        try {
            return ResponseEntity.ok(
                    ApiResponse.<UserResponse>builder()
                            .result(userService.updateUser(userId, userUpdateRequest))
                            .message("Cập nhật bất động sản thành công")
                            .build());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(ApiResponse.<UserResponse>builder()
                            .message("Lỗi khi cập nhật bất động sản: " + e.getMessage())
                            .build());
        }
    }

    @DeleteMapping("/{userId}")
    public ResponseEntity<ApiResponse<Void>> deleteProperty(@PathVariable int userId) {
        try {
            userService.deleteUser(userId);
            return ResponseEntity.ok(
                    ApiResponse.<Void>builder()
                            .message("Xóa bất động sản thành công")
                            .build());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(ApiResponse.<Void>builder()
                            .message("Lỗi khi xóa bất động sản: " + e.getMessage())
                            .build());
        }
    }
}
