package com.tln.trustestatego.service;

import com.tln.trustestatego.dto.request.ReviewRequest;
import com.tln.trustestatego.dto.response.ReviewResponse;

import java.util.List;

public interface ReviewService {
    List<ReviewResponse> getReviews();
    ReviewResponse createReview(ReviewRequest reviewRequest);
    ReviewResponse updateReview(int reviewId, ReviewRequest reviewRequest);
    void deleteReview(int reviewId);
}
