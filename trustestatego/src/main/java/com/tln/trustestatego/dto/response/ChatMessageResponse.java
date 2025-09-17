package com.tln.trustestatego.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ChatMessageResponse {
    private Integer id;
    private String message;
    private String messageType;
    private Boolean isRead;
    private LocalDateTime createdAt;
    private Integer senderId;
    private String senderName;
}
