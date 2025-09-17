package com.tln.trustestatego.repository;

import com.tln.trustestatego.entity.ChatMessage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ChatMessageRepository extends JpaRepository<ChatMessage, Integer> {
    List<ChatMessage> findByRoomIdOrderByCreatedAtAsc(Integer roomId);
}