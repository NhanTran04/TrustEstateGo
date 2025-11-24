package com.tln.trustestatego.service.Impl;

import com.tln.trustestatego.dto.response.ChatMessageResponse;
import com.tln.trustestatego.dto.response.ChatRoomResponse;
import com.tln.trustestatego.entity.ChatMessage;
import com.tln.trustestatego.entity.ChatRoom;
import com.tln.trustestatego.entity.User;
import com.tln.trustestatego.mapper.ChatMapper;
import com.tln.trustestatego.repository.ChatMessageRepository;
import com.tln.trustestatego.repository.ChatRoomRepository;
import com.tln.trustestatego.repository.UserRepository;
import com.tln.trustestatego.service.ChatService;
import com.tln.trustestatego.service.CurrentUserService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ChatServiceImpl implements ChatService {
    ChatRoomRepository chatRoomRepo;
    ChatMessageRepository chatMessageRepo;
    ChatMapper mapper;
    CurrentUserService currentUserService;
    UserRepository userRepository;

    @Override
    public ChatRoom getOrCreateRoom(Integer sellerId) {
        User currentUser = currentUserService.getCurrentUser();
        User seller = userRepository.findById(sellerId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Seller not found"));
        return chatRoomRepo.findByUserIdAndSellerId(currentUser.getId(), sellerId)
                .orElseGet(() -> {
                    ChatRoom room = new ChatRoom();
                    room.setUser(currentUser);
                    room.setSeller(seller);
                    room.setCreatedAt(LocalDateTime.now());
                    return chatRoomRepo.save(room);
                });
    }

    @Override
    public ChatMessage saveMessage(Integer roomId, String text, int senderId) {
        User sender = userRepository.findById(senderId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Sender not found"));

        ChatRoom room = chatRoomRepo.findById(roomId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        ChatMessage message = new ChatMessage();
        message.setRoom(room);
        message.setSender(sender);
        message.setMessage(text);
        message.setMessageType("TEXT");
        message.setCreatedAt(LocalDateTime.now());
        message.setIsRead(false);

        room.setLastMessage(text);
        room.setLastMessageAt(LocalDateTime.now());
        chatRoomRepo.save(room);
        return chatMessageRepo.save(message);
    }

    @Override
    public List<ChatMessageResponse> getMessages(Integer roomId) {
        return chatMessageRepo.findByRoomIdOrderByCreatedAtAsc(roomId)
                .stream().map(mapper::toChatMessageResponse).toList();
    }

    @Override
    public List<ChatRoomResponse> getUserRooms() {
        User currentUser = currentUserService.getCurrentUser();
        List<ChatRoom> rooms = chatRoomRepo.findByUserIdOrSellerId(currentUser.getId(), currentUser.getId());

        return rooms.stream().map(room -> {
            ChatRoomResponse dto = mapper.toChatRoomResponse(room);

            // xác định đối phương
            User partner = room.getUser().getId().equals(currentUser.getId())
                    ? room.getSeller()
                    : room.getUser();

            dto.setPartnerName(partner.getFirstName() + " " + partner.getLastName());
            dto.setPartnerAvatar(partner.getAvatar());
            dto.setLastMessageAt(room.getLastMessageAt());

            return dto;
        }).toList();
    }
}
