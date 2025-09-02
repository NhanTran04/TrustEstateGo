package com.tln.trustestatego.repository;

import com.tln.trustestatego.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import javax.swing.text.html.Option;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {
    boolean existsByUsername(String username);
    boolean existsByEmail(String email);
    Optional<User> findByUsername(String Username);
    Page<User> findByUsernameContainingIgnoreCase(String username, Pageable pageable);
    @Query("""
        SELECT DISTINCT u 
        FROM User u
        JOIN u.userRoles ur
        JOIN ur.role r
        WHERE r.name = 'SELLER'
          AND (
              LOWER(u.firstName) LIKE LOWER(CONCAT('%', :keyword, '%')) 
              OR LOWER(u.lastName) LIKE LOWER(CONCAT('%', :keyword, '%'))
          )
        """)
    Page<User> findSellersByName(@Param("keyword") String keyword, Pageable pageable);
}
