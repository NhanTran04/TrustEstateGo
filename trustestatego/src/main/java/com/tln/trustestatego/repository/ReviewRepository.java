package com.tln.trustestatego.repository;

import com.tln.trustestatego.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReviewRepository extends JpaRepository<Review, Integer> {
}
