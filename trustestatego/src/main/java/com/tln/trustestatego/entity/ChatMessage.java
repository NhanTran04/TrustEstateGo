package com.tln.trustestatego.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;

import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name = "chat_message", indexes = {
        @Index(name = "room_id", columnList = "room_id"),
        @Index(name = "sender_id", columnList = "sender_id")
})
public class ChatMessage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "room_id")
    private ChatRoom room;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "sender_id")
    private User sender;

    @Lob
    @Column(name = "message")
    private String message;

    @Lob
    @Column(name = "message_type")
    private String messageType;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @ColumnDefault("0")
    @Column(name = "is_read")
    private Boolean isRead;

}