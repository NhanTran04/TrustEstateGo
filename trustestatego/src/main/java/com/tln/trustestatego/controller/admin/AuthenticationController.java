package com.tln.trustestatego.controller.admin;

import com.tln.trustestatego.service.AuthenticationService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/api/auth")
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
