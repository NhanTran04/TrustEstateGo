package com.tln.trustestatego.repository;

import com.tln.trustestatego.entity.Review;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReviewRepository extends JpaRepository<Review, Integer> {
    Page<Review> findBySeller_Id(int sellerId, Pageable pageable);
    Page<Review> findByBuyer_Id(int buyerId, Pageable pageable);
}
