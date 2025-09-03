package com.tln.trustestatego.service;

import com.tln.trustestatego.dto.request.ReviewRequest;
import com.tln.trustestatego.dto.response.PageResponse;
import com.tln.trustestatego.dto.response.ReviewResponse;
import com.tln.trustestatego.dto.response.SellerReviewResponse;
import com.tln.trustestatego.dto.response.UserResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ReviewService {
    PageResponse<ReviewResponse> getReviewBySellerId(int sellerId, Pageable pageable);
    PageResponse<ReviewResponse> getReviewByUserId(int userId, Pageable pageable);
    Page<SellerReviewResponse> getSellerReviews(String keyword, Pageable pageable);
    ReviewResponse createReview(ReviewRequest reviewRequest);
    //ReviewResponse updateReview(int reviewId, ReviewRequest reviewRequest);
    void deleteReview(int reviewId);
}
