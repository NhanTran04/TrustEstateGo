package com.tln.trustestatego.service.Impl;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
import com.google.api.client.json.jackson2.JacksonFactory;
import com.nimbusds.jose.*;
import com.nimbusds.jose.crypto.MACSigner;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.SignedJWT;
import com.tln.trustestatego.dto.request.AuthenticationRequest;
import com.tln.trustestatego.dto.response.AuthenticationResponse;
import com.tln.trustestatego.dto.response.UserResponse;
import com.tln.trustestatego.entity.User;
import com.tln.trustestatego.mapper.UserMapper;
import com.tln.trustestatego.repository.UserRepository;
import com.tln.trustestatego.service.AuthenticationService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.experimental.NonFinal;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@Slf4j
@RequiredArgsConstructor
@Service
@Transactional
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AuthenticationServiceImpl implements AuthenticationService {
    UserRepository userRepository;
    UserMapper userMapper;

    @NonFinal // khong exact vao constructor
    @Value("${jwt.signer-key}")
    protected String SIGNER_KEY;
    PasswordEncoder passwordEncoder;

    @NonFinal
    @Value("${google.client-id}")
    private String googleClientId;

    @NonFinal
    GoogleIdTokenVerifier verifier;

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        var user = userRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "user not found"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED);
        }

        String token = generateToken(user);

        return AuthenticationResponse.builder()
                .token(token)
                .user(userMapper.toUserResponse(user))
                .build();
    }

    private String generateToken(User user) {
        List<String> roles = user.getUserRoles()
                .stream()
                .map(userRole -> userRole.getRole().getName())
                .toList();

        JWTClaimsSet claims = new JWTClaimsSet.Builder()
                .subject(user.getUsername())
                .issuer("tln.com")
                .issueTime(Date.from(Instant.now()))
                .expirationTime(Date.from(Instant.now().plus(1, ChronoUnit.HOURS)))
                .claim("roles", roles)
                .jwtID(UUID.randomUUID().toString())
                .build();

        SignedJWT signedJWT = new SignedJWT(new JWSHeader(JWSAlgorithm.HS512), claims);
        try {
            signedJWT.sign(new MACSigner(SIGNER_KEY.getBytes()));
            return signedJWT.serialize();
        } catch (JOSEException e) {
            log.error("Lỗi khi ký JWT", e);
            throw new RuntimeException(e);
        }
    }

    private void initGoogleVerifier() throws Exception {
        if (verifier == null) {
            verifier = new GoogleIdTokenVerifier.Builder(
                    GoogleNetHttpTransport.newTrustedTransport(),
                    GsonFactory.getDefaultInstance()
            )
                    .setAudience(Collections.singletonList(googleClientId))
                    .build();
        }
    }

    @Override
    public AuthenticationResponse loginWithGoogle(String idTokenString) {
        try {
            initGoogleVerifier();

            GoogleIdToken idToken = verifier.verify(idTokenString);
            log.info("Google idToken verify result: {}", idToken);
            if (idToken == null) {
                throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Token Google không hợp lệ");
            }

            GoogleIdToken.Payload payload = idToken.getPayload();
            String email = payload.getEmail();

            var user = userRepository.findByEmail(email)
                    .orElseThrow(() -> new ResponseStatusException(
                            HttpStatus.BAD_REQUEST, "Tài khoản chưa được tạo trong hệ thống"
                    ));

            String token = generateToken(user);

            return AuthenticationResponse.builder()
                    .token(token)
                    .user(userMapper.toUserResponse(user))
                    .build();

        } catch (Exception e) {
            log.error("Lỗi khi xác thực Google: ", e);
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Đăng nhập Google thất bại");
        }
    }

}
