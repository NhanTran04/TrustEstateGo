package com.tln.trustestatego.service.Impl;

import com.tln.trustestatego.dto.request.ReviewAdminRequest;
import com.tln.trustestatego.dto.request.ReviewRequest;
import com.tln.trustestatego.dto.response.PageResponse;
import com.tln.trustestatego.dto.response.ReviewResponse;
import com.tln.trustestatego.dto.response.SellerReviewResponse;
import com.tln.trustestatego.dto.response.UserResponse;
import com.tln.trustestatego.entity.Property;
import com.tln.trustestatego.entity.Review;
import com.tln.trustestatego.entity.User;
import com.tln.trustestatego.mapper.PageMapper;
import com.tln.trustestatego.mapper.ReviewMapper;
import com.tln.trustestatego.mapper.UserMapper;
import com.tln.trustestatego.repository.PropertyRepository;
import com.tln.trustestatego.repository.ReviewRepository;
import com.tln.trustestatego.repository.UserRepository;
import com.tln.trustestatego.service.CurrentUserService;
import com.tln.trustestatego.service.ReviewService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

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
    UserMapper userMapper;
    CurrentUserService currentUserService;

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
    public PageResponse<ReviewResponse> getReviewByUserId(Pageable pageable) {
        User user = currentUserService.getCurrentUser();
        Pageable sortPage = PageRequest.of(
                pageable.getPageNumber(),
                pageable.getPageSize(),
                Sort.by(Sort.Direction.DESC, "createdAt")
        );

        Page<ReviewResponse> reviewPage =  reviewRepository.findByBuyer_Id(user.getId(), sortPage)
                .map(reviewMapper::toReviewResponse);
        return pageMapper.toPageResponse(reviewPage);
    }

    @Override
    public Page<SellerReviewResponse> getSellerReviews(String keyword, Pageable pageable) {
        return reviewRepository.findSellerReview(keyword, pageable);
    }

//    @Override
//    public PageResponse<UserResponse> getUserByRoleSeller(String kw, Pageable pageable) {
//        if (kw == null || kw.isBlank()) {
//            kw = "";
//        }
//        Page<UserResponse> userPage = userRepository.findSellersByName(kw, pageable)
//                .map(userMapper::toUserResponse);
//        return pageMapper.toPageResponse(userPage);
//    }

    @Override
    public ReviewResponse createReview(ReviewRequest reviewRequest, int propertyId) {
        User user = currentUserService.getCurrentUser();
        Review review = reviewMapper.toReview(reviewRequest);

        User seller = userRepository.findById(reviewRequest.getSellerId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Seller not found"));
        Property property = propertyRepository.findById(propertyId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Property not found"));

        review.setCreatedAt(LocalDateTime.now());
        review.setBuyer(user);
        review.setSeller(seller);
        review.setProperty(property);
        reviewRepository.save(review);

        return reviewMapper.toReviewResponse(review);
    }

    @Override
    public ReviewResponse createReviewFromAdmin(ReviewAdminRequest reviewAdminRequest) {
        User user = currentUserService.getCurrentUser();
        Review review = reviewMapper.toReview(reviewAdminRequest);

        User buyer = userRepository.findById(user.getId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Buyer not found"));
        User seller = userRepository.findById(reviewAdminRequest.getSellerId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Seller not found"));
        Property property = propertyRepository.findById(reviewAdminRequest.getPropertyId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Property not found"));

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
