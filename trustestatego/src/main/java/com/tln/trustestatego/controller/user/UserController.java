package com.tln.trustestatego.controller.user;

import com.tln.trustestatego.dto.request.UserCreationRequest;
import com.tln.trustestatego.dto.request.UserUpdateRequest;
import com.tln.trustestatego.dto.response.ApiResponse;
import com.tln.trustestatego.dto.response.PageResponse;
import com.tln.trustestatego.dto.response.UserResponse;
import com.tln.trustestatego.service.UserService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/api/users")
@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class UserController {
    UserService userService;

    @GetMapping
    public ResponseEntity<ApiResponse<PageResponse<UserResponse>>> getUsers(@RequestParam(defaultValue = "") String kw, Pageable pageable) {
        try {
            return ResponseEntity.ok(
                    ApiResponse.<PageResponse<UserResponse>>builder()
                            .result(userService.getUsers(kw, pageable))
                            .build()
            );
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ApiResponse.<PageResponse<UserResponse>>builder()
                            .message(e.getMessage())
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

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ApiResponse<UserResponse>> createUser(@ModelAttribute UserCreationRequest userCreationRequest) {
        try {
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(ApiResponse.<UserResponse>builder()
                            .result(userService.createUser(userCreationRequest))
                            .build());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(ApiResponse.<UserResponse>builder()
                            .message(e.getMessage())
                            .build());
        }
    }

    @PutMapping(path = "/{userId}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ApiResponse<UserResponse>> updateUser(
            @PathVariable int userId,
            @ModelAttribute UserUpdateRequest userUpdateRequest) {
        try {
            return ResponseEntity.ok(
                    ApiResponse.<UserResponse>builder()
                            .result(userService.updateUser(userId, userUpdateRequest))
                            .build());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ApiResponse.<UserResponse>builder()
                            .message(e.getMessage())
                            .build());
        }
    }

    @DeleteMapping("/{userId}")
    public ResponseEntity<ApiResponse<Void>> deleteUser(@PathVariable int userId) {
        try {
            userService.deleteUser(userId);
            return ResponseEntity.ok(
                    ApiResponse.<Void>builder()
                            .build());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(ApiResponse.<Void>builder()
                            .message(e.getMessage())
                            .build());
        }
    }
}
