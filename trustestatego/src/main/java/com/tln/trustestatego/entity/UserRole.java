package com.tln.trustestatego.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "user_role",
        indexes = {
                @Index(name = "user_id", columnList = "user_id"),
                @Index(name = "role_id", columnList = "role_id")
        },
        uniqueConstraints = {
                @UniqueConstraint(columnNames = {"user_id", "role_id"})
        })
public class UserRole {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "role_id", nullable = false)
    private Role role;

}