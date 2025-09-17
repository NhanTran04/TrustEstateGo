package com.tln.trustestatego.repository;

import com.tln.trustestatego.entity.ChatRoom;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ChatRoomRepository extends JpaRepository<ChatRoom, Integer> {
    Optional<ChatRoom> findByUserIdAndSellerId(Integer userId, Integer sellerId);
    List<ChatRoom> findByUserIdOrSellerId(Integer userId, Integer sellerId);
}
