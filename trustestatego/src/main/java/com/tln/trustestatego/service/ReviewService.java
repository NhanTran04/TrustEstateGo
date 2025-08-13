package com.tln.trustestatego.service;

import com.tln.trustestatego.dto.request.ReviewRequest;
import com.tln.trustestatego.dto.response.ReviewResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ReviewService {
    Page<ReviewResponse> getReviewBySellerId(int sellerId, Pageable pageable);
    Page<ReviewResponse> getReviewByUserId(int userId, String keyword, Pageable pageable);
    ReviewResponse createReview(ReviewRequest reviewRequest);
    //ReviewResponse updateReview(int reviewId, ReviewRequest reviewRequest);
    //void deleteReview(int reviewId);
}
