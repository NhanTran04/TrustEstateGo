package com.tln.trustestatego.repository;

import com.tln.trustestatego.dto.response.SellerReviewResponse;
import com.tln.trustestatego.entity.Review;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ReviewRepository extends JpaRepository<Review, Integer> {
    Page<Review> findBySeller_Id(int sellerId, Pageable pageable);
    Page<Review> findByBuyer_Id(int buyerId, Pageable pageable);
    @Query("""
        SELECT new com.tln.trustestatego.dto.response.SellerReviewResponse(
            s.id,
            s.id,
            CONCAT(s.firstName, ' ', s.lastName),
            COUNT(r.id),
            AVG(r.rating)
        )
        FROM Review r
        JOIN r.seller s
        WHERE (:keyword IS NULL OR
               LOWER(s.firstName) LIKE LOWER(CONCAT('%', :keyword, '%'))
               OR LOWER(s.lastName) LIKE LOWER(CONCAT('%', :keyword, '%')))
        GROUP BY s.id, s.firstName, s.lastName, s.username
    """)
    Page<SellerReviewResponse> findSellerReview(@Param("keyword") String keyword, Pageable pageable);
}
