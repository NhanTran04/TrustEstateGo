package com.tln.trustestatego.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name = "property_image", indexes = {
        @Index(name = "property_id", columnList = "property_id")
})
public class PropertyImage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "property_id")
    private Property property;

    @Column(name = "image_url")
    private String imageUrl;

//    @Column(name = "is_primary")
//    private Boolean isPrimary;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

}