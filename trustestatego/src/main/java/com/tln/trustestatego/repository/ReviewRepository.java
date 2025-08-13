package com.tln.trustestatego.repository;

import com.tln.trustestatego.entity.Review;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReviewRepository extends JpaRepository<Review, Integer> {
    Page<Review> findBySellerId(int sellerId, Pageable pageable);
    Page<Review> findByUserId(int userId, String keyword, Pageable pageable);
}
