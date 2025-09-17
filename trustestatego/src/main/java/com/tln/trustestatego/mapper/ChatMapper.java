package com.tln.trustestatego.mapper;

import com.tln.trustestatego.dto.response.ChatMessageResponse;
import com.tln.trustestatego.dto.response.ChatRoomResponse;
import com.tln.trustestatego.entity.ChatMessage;
import com.tln.trustestatego.entity.ChatRoom;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface ChatMapper {
    @Mapping(source = "sender.id", target = "senderId")
    @Mapping(target = "senderName",expression = "java(entity.getSender().getFirstName() + \" \" + entity.getSender().getLastName())")
    ChatMessageResponse toChatMessageResponse(ChatMessage entity);
    @Mapping(source = "seller.id", target = "sellerId")
    @Mapping(source = "user.id", target = "userId")
    ChatRoomResponse toChatRoomResponse(ChatRoom entity);
}