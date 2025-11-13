package com.tln.trustestatego.entity;

//import com.tln.trustestatego.elasticsearch.PropertyElasticListener;
import com.tln.trustestatego.enums.PropertyStatus;
import com.tln.trustestatego.enums.PropertyType;
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
//@EntityListeners(PropertyElasticListener.class)
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

    @Enumerated(EnumType.STRING)
    @Column(name = "property_type", length = 50)
    private PropertyType propertyType;

    @Column(name = "area")
    private Integer area;

    @Column(name = "bedroom")
    private Integer bedroom;

    @Column(name = "interior", length = 255)
    private String interior;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "latitude")
    private Double latitude;

    @Column(name = "longitude")
    private Double longitude;

    @Column(name = "blockchain_hash", length = 100)
    private String blockchainHash;

    @Column(name = "blockchain_tx_hash", length = 100)
    private String blockchainTxHash;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", length = 20)
    private PropertyStatus status;

    @Column(name = "approved_at")
    private LocalDateTime approvedAt;


//    @OneToMany(mappedBy = "property")
//    private Set<ChatRoom> chatRooms = new LinkedHashSet<>();

    @OneToMany(mappedBy = "property", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private Set<PropertyImage> propertyImages = new LinkedHashSet<>();

    @OneToMany(mappedBy = "property", fetch = FetchType.LAZY)
    private Set<PropertySave> propertySaves = new LinkedHashSet<>();

//    @OneToMany(mappedBy = "property")
//    private Set<PropertyView> propertyViews = new LinkedHashSet<>();

    @OneToMany(mappedBy = "property", fetch = FetchType.LAZY)
    private Set<Report> reports = new LinkedHashSet<>();

    @OneToMany(mappedBy = "property", fetch = FetchType.LAZY)
    private Set<Review> reviews = new LinkedHashSet<>();

}