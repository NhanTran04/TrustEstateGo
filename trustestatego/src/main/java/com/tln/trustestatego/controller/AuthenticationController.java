package com.tln.trustestatego.controller;

import com.tln.trustestatego.dto.request.AuthenticationRequest;
import com.tln.trustestatego.dto.response.ApiResponse;
import com.tln.trustestatego.dto.response.AuthenticationResponse;
import com.tln.trustestatego.service.AuthenticationService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/auth")
@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AuthenticationController {
    AuthenticationService authenticationService;

//    @PostMapping("/log-in")
//    ResponseEntity<ApiResponse<AuthenticationResponse>> authenticate(@RequestBody AuthenticationRequest request){
//        boolean authenticated = authenticationService.authenticate(request);
//        return ResponseEntity.ok().body(ApiResponse.<AuthenticationResponse>builder()
//                        .result(AuthenticationResponse.builder()
//                                .authenticated(authenticated)
//                                .build())
//                .build());
//    }
}
