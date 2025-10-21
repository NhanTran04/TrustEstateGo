package com.tln.trustestatego.controller.user;

import com.tln.trustestatego.dto.request.ChatMessageRequest;
import com.tln.trustestatego.dto.response.ChatMessageResponse;
import com.tln.trustestatego.dto.response.ChatRoomResponse;
import com.tln.trustestatego.entity.ChatMessage;
import com.tln.trustestatego.mapper.ChatMapper;
import com.tln.trustestatego.service.ChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/chat")
public class ChatController {
    private final ChatService chatService;
    private final SimpMessagingTemplate messagingTemplate;
    private final ChatMapper mapper;

    @PreAuthorize("hasAnyRole('USER', 'SELLER')")
    @PostMapping("/room/{sellerId}")
    public ChatRoomResponse createRoom(@PathVariable Integer sellerId) {
        return mapper.toChatRoomResponse(chatService.getOrCreateRoom(sellerId));
    }

    // Lấy tin nhắn của 1 phòng
    @PreAuthorize("hasAnyRole('USER', 'SELLER')")
    @GetMapping("/messages/{roomId}")
    public List<ChatMessageResponse> getMessages(@PathVariable Integer roomId) {
        return chatService.getMessages(roomId);
    }

    @MessageMapping("/chat.sendMessage")
    public void sendMessage(ChatMessageRequest req) {
        ChatMessage saved = chatService.saveMessage(req.getRoomId(), req.getMessage(), req.getSenderId());
        messagingTemplate.convertAndSend("/topic/room/" + req.getRoomId(),
                mapper.toChatMessageResponse(saved));
    }

    @PreAuthorize("hasAnyRole('USER', 'SELLER')")
    @GetMapping("/rooms")
    public ResponseEntity<List<ChatRoomResponse>> getUserRooms() {
        List<ChatRoomResponse> rooms = chatService.getUserRooms();
        return ResponseEntity.ok(rooms);
    }
}
