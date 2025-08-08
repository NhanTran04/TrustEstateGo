package com.tln.trustestatego.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.LinkedHashSet;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "user", uniqueConstraints = {
        @UniqueConstraint(name = "email", columnNames = {"email"}),
        @UniqueConstraint(name = "username", columnNames = {"username"})
})
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "firstName", length = 100)
    private String firstName;

    @Column(name = "lastName", length = 100)
    private String lastName;

    @Lob
    @Column(name = "gender")
    private String gender;

    @Column(name = "birthday")
    private LocalDate birthday;

    @Column(name = "email")
    private String email;

    @Column(name = "address")
    private String address;

    @Column(name = "phone", length = 20)
    private String phone;

    @Column(name = "username", length = 50)
    private String username;

    @Column(name = "password")
    private String password;

    @Column(name = "avatar")
    private String avatar;

    @ColumnDefault("1")
    @Column(name = "is_active")
    private Boolean isActive;


    @Column(name = "created_at")
    private LocalDateTime createdAt;


    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @OneToMany(mappedBy = "sender")
    private Set<ChatMessage> chatMessages = new LinkedHashSet<>();

    @OneToMany(mappedBy = "user")
    private Set<ChatRoom> chatRoomsAsUser = new LinkedHashSet<>();

    @OneToMany(mappedBy = "seller")
    private Set<ChatRoom> chatRoomsAsSeller = new LinkedHashSet<>();

    @OneToMany(mappedBy = "user")
    private Set<Payment> payments = new LinkedHashSet<>();

    @OneToMany(mappedBy = "user")
    private Set<Property> properties = new LinkedHashSet<>();

    @OneToMany(mappedBy = "user")
    private Set<PropertySave> propertySaves = new LinkedHashSet<>();

    @OneToMany(mappedBy = "user")
    private Set<PropertyView> propertyViews = new LinkedHashSet<>();

    @OneToMany(mappedBy = "user")
    private Set<Report> reportsAsUser = new LinkedHashSet<>();

    @OneToMany(mappedBy = "staff")
    private Set<Report> reportsAsStaff = new LinkedHashSet<>();

    @OneToMany(mappedBy = "buyer")
    private Set<Review> reviewsAsBuyer = new LinkedHashSet<>();

    @OneToMany(mappedBy = "seller")
    private Set<Review> reviewsAsSeller = new LinkedHashSet<>();

    @OneToMany(mappedBy = "user")
    private Set<UserRole> userRoles = new LinkedHashSet<>();

}