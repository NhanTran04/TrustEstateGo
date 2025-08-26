package com.tln.trustestatego.entity;

import com.tln.trustestatego.elasticsearch.PropertyElasticListener;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.LinkedHashSet;
import java.util.Set;

@Getter
@Setter
@Entity
@EntityListeners(PropertyElasticListener.class)
@Table(name = "property", indexes = {
        @Index(name = "category_id", columnList = "category_id"),
        @Index(name = "user_id", columnList = "user_id")
})
public class Property {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    private Category category;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "title")
    private String title;

    @Lob
    @Column(name = "description")
    private String description;

    @Column(name = "expire_at")
    private LocalDateTime expireAt;

    @Column(name = "price", precision = 15, scale = 2)
    private BigDecimal price;

    @Column(name = "location")
    private String location;

    @ColumnDefault("1")
    @Column(name = "is_active")
    private Boolean isActive;

    @Column(name = "property_type", length = 100)
    private String propertyType;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @OneToMany(mappedBy = "property")
    private Set<ChatRoom> chatRooms = new LinkedHashSet<>();

    @OneToMany(mappedBy = "property", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<PropertyImage> propertyImages = new LinkedHashSet<>();

    @OneToMany(mappedBy = "property")
    private Set<PropertySave> propertySaves = new LinkedHashSet<>();

    @OneToMany(mappedBy = "property")
    private Set<PropertyView> propertyViews = new LinkedHashSet<>();

    @OneToMany(mappedBy = "property")
    private Set<Report> reports = new LinkedHashSet<>();

    @OneToMany(mappedBy = "property")
    private Set<Review> reviews = new LinkedHashSet<>();

}