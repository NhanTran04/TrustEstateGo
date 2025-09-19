package com.tln.trustestatego.controller.user;

import com.tln.trustestatego.dto.request.ChatBoxRequest;
import com.tln.trustestatego.dto.response.ChatBoxResponse;
import com.tln.trustestatego.service.ChatBoxService;
import com.tln.trustestatego.service.ChatService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/chat-box")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ChatBoxController {
    ChatBoxService chatBoxService;

    @PostMapping
    public ResponseEntity<ChatBoxResponse> chat(@Valid @RequestBody ChatBoxRequest request) {
        return ResponseEntity.ok(chatBoxService.ask(request.getMessage()));
    }
}
