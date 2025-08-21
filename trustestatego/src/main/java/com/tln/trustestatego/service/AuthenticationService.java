package com.tln.trustestatego.service;

import com.tln.trustestatego.dto.request.AuthenticationRequest;
import com.tln.trustestatego.dto.response.AuthenticationResponse;

public interface AuthenticationService{
    AuthenticationResponse authenticate(AuthenticationRequest authenticationRequest);
}
