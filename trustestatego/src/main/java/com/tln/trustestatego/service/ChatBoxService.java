package com.tln.trustestatego.service;

import com.tln.trustestatego.dto.response.ChatBoxResponse;

public interface ChatBoxService {
    ChatBoxResponse ask(String userMessage);
}
