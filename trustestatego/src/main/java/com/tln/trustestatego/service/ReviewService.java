package com.tln.trustestatego.service;

import com.tln.trustestatego.dto.request.ReviewAdminRequest;
import com.tln.trustestatego.dto.request.ReviewRequest;
import com.tln.trustestatego.dto.response.PageResponse;
import com.tln.trustestatego.dto.response.ReviewResponse;
import com.tln.trustestatego.dto.response.SellerReviewResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ReviewService {
    PageResponse<ReviewResponse> getReviewBySellerId(int sellerId, Pageable pageable);
    PageResponse<ReviewResponse> getReviewByUserId(Pageable pageable);
    Page<SellerReviewResponse> getSellerReviews(String keyword, Pageable pageable);
    ReviewResponse createReview(ReviewRequest reviewRequest, int propertyId);
    ReviewResponse createReviewFromAdmin(ReviewAdminRequest reviewAdminRequest);
    //ReviewResponse updateReview(int reviewId, ReviewRequest reviewRequest);
    void deleteReview(int reviewId);
    Long countReviewBySellerId(int sellerId);
    Double getAvgRatingBySellerId(int sellerId);
}
