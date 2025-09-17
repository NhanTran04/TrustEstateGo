package com.tln.trustestatego.service;

import com.tln.trustestatego.dto.response.ChatMessageResponse;
import com.tln.trustestatego.dto.response.ChatRoomResponse;
import com.tln.trustestatego.entity.ChatMessage;
import com.tln.trustestatego.entity.ChatRoom;

import java.util.List;

public interface ChatService {
    ChatRoom getOrCreateRoom(Integer sellerId);
    ChatMessage saveMessage(Integer roomId, String text,int senderId);
    List <ChatMessageResponse> getMessages(Integer roomId);
    List<ChatRoomResponse> getUserRooms();
}
