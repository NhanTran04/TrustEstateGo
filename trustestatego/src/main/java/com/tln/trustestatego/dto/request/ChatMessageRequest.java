package com.tln.trustestatego.dto.request;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ChatMessageRequest {
    @NotNull(message = "Room ID must not be null")
    @Min(value = 1, message = "Room ID must be a positive number")
    Integer roomId;
    @NotBlank(message = "Message content must not be blank")
    @Size(max = 500, message = "Message content must not exceed 500 characters")
    String message;
    @NotNull(message = "Sender ID must not be null")
    @Min(value = 1, message = "Sender ID must be a positive number")
    Integer senderId;
}
