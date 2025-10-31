package com.tln.trustestatego.controller.admin;

import com.tln.trustestatego.dto.request.AuthenticationRequest;
import com.tln.trustestatego.dto.request.UserCreationRequest;
import com.tln.trustestatego.dto.response.ApiResponse;
import com.tln.trustestatego.dto.response.AuthenticationResponse;
import com.tln.trustestatego.dto.response.UserResponse;
import com.tln.trustestatego.service.AuthenticationService;
import com.tln.trustestatego.service.UserService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RequestMapping("/api/auth")
@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AuthenticationController {
    AuthenticationService authenticationService;
    UserService userService;

    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> login(@RequestBody AuthenticationRequest request) {
        try {
            AuthenticationResponse response = authenticationService.authenticate(request);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED);
        }
    }

    @PostMapping(path = "/register", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
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

    @PostMapping(path = "/google")
    public ResponseEntity<AuthenticationResponse> loginWithGoogle(@RequestParam("idToken") String idToken) {
        try {
            AuthenticationResponse response = authenticationService.loginWithGoogle(idToken);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED);
        }
    }
}
