package com.tln.trustestatego.service.Impl;

import com.tln.trustestatego.dto.request.ReviewRequest;
import com.tln.trustestatego.dto.response.PageResponse;
import com.tln.trustestatego.dto.response.ReviewResponse;
import com.tln.trustestatego.entity.Property;
import com.tln.trustestatego.entity.Review;
import com.tln.trustestatego.entity.User;
import com.tln.trustestatego.mapper.PageMapper;
import com.tln.trustestatego.mapper.ReviewMapper;
import com.tln.trustestatego.repository.PropertyRepository;
import com.tln.trustestatego.repository.ReviewRepository;
import com.tln.trustestatego.repository.UserRepository;
import com.tln.trustestatego.service.ReviewService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Slf4j
@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Transactional
public class ReviewServiceImpl implements ReviewService {
    ReviewRepository reviewRepository;
    ReviewMapper reviewMapper;
    UserRepository userRepository;
    PropertyRepository propertyRepository;
    PageMapper pageMapper;

    @Override
    public PageResponse<ReviewResponse> getReviewBySellerId(int sellerId, Pageable pageable) {
        Pageable sortPage = PageRequest.of(
                pageable.getPageNumber(),
                pageable.getPageSize(),
                Sort.by(Sort.Direction.DESC, "createdAt")
        );

        Page<ReviewResponse> reviewPage = reviewRepository.findBySeller_Id(sellerId, sortPage)
                .map(reviewMapper::toReviewResponse);
        return pageMapper.toPageResponse(reviewPage);
    }

    @Override
    public PageResponse<ReviewResponse> getReviewByUserId(int buyerId, Pageable pageable) {
        Pageable sortPage = PageRequest.of(
                pageable.getPageNumber(),
                pageable.getPageSize(),
                Sort.by(Sort.Direction.DESC, "createdAt")
        );

        Page<ReviewResponse> reviewPage =  reviewRepository.findByBuyer_Id(buyerId, sortPage)
                .map(reviewMapper::toReviewResponse);
        return pageMapper.toPageResponse(reviewPage);
    }

    @Override
    public ReviewResponse createReview(ReviewRequest reviewRequest) {
        Review review = reviewMapper.toReview(reviewRequest);

        User buyer = userRepository.findById(reviewRequest.getBuyerId())
                .orElseThrow(() -> new RuntimeException("Buyer not found"));
        User seller = userRepository.findById(reviewRequest.getSellerId())
                .orElseThrow(() -> new RuntimeException("Seller not found"));
        Property property = propertyRepository.findById(reviewRequest.getPropertyId())
                .orElseThrow(() -> new RuntimeException("Property not found"));

        review.setCreatedAt(LocalDateTime.now());
        review.setBuyer(buyer);
        review.setSeller(seller);
        review.setProperty(property);
        reviewRepository.save(review);

        return reviewMapper.toReviewResponse(review);
    }

    @Override
    public void deleteReview(int reviewId) {
        reviewRepository.deleteById(reviewId);
    }
}
