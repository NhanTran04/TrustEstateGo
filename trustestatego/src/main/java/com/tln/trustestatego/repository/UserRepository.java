package com.tln.trustestatego.repository;

import com.tln.trustestatego.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import javax.swing.text.html.Option;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {
    boolean existsByUsername(String username);
    boolean existsByEmail(String email);
    Optional<User> findByUsername(String Username);
    Page<User> findByUsernameContainingIgnoreCase(String username, Pageable pageable);
}
