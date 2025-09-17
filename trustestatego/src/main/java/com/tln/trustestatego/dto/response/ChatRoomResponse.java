package com.tln.trustestatego.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ChatRoomResponse {
    private Integer id;
    private Integer userId;
    private Integer sellerId;
    private String partnerName;     // tên đối phương
    private String partnerAvatar;   // avatar đối phương
    private LocalDateTime lastMessageAt;
}
