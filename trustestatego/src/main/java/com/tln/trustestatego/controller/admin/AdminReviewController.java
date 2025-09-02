package com.tln.trustestatego.controller.admin;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.tln.trustestatego.dto.request.ReviewRequest;
import com.tln.trustestatego.dto.response.ApiResponse;
import com.tln.trustestatego.dto.response.PageResponse;
import com.tln.trustestatego.dto.response.ReviewResponse;
import com.tln.trustestatego.service.ReviewService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/review-seller")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AdminReviewController {
    ReviewService reviewService;

//    @GetMapping("/users/{buyerId}")
//    public ResponseEntity<List<ReviewResponse>> getReviewByUserId(
//            @PathVariable int buyerId, Pageable pageable) {
//        PageResponse<ReviewResponse> pageResponse = reviewService.getReviewByUserId(buyerId, pageable);
//
//        int start = pageable.getPageNumber() * pageable.getPageSize();
//        int end = start + pageResponse.getContent().size() - 1;
//
//        HttpHeaders headers = new HttpHeaders();
//        headers.add("Content-Range",
//                "reviews " + start + "-" + end + "/" + pageResponse.getTotalElements());
//        headers.add("Access-Control-Expose-Headers", "Content-Range");
//
//        return new ResponseEntity<>(pageResponse.getContent(), headers, HttpStatus.OK);
//    }

//    @GetMapping
//    public ResponseEntity<List<ReviewResponse>> getSellers(
//            @RequestParam(name = "filter", required = false) String filter,
//            @RequestParam(name = "range", required = false) String range,
//            @RequestParam(name = "sort", required = false) String sort) throws JsonProcessingException {
//        PageResponse<ReviewResponse> pageResponse = reviewService.getReviewBySellerId(sellerId, pageable);
//
//        int start = pageable.getPageNumber() * pageable.getPageSize();
//        int end = start + pageResponse.getContent().size() - 1;
//
//        HttpHeaders headers = new HttpHeaders();
//        headers.add("Content-Range",
//                "reviews " + start + "-" + end + "/" + pageResponse.getTotalElements());
//        headers.add("Access-Control-Expose-Headers", "Content-Range");
//
//        return new ResponseEntity<>(pageResponse.getContent(), headers, HttpStatus.OK);
//    }

    @GetMapping("/{sellerId}/reviews")
    public ResponseEntity<List<ReviewResponse>> getReviewBySellerId(
            @PathVariable int sellerId, Pageable pageable) {
        PageResponse<ReviewResponse> pageResponse = reviewService.getReviewBySellerId(sellerId, pageable);

        int start = pageable.getPageNumber() * pageable.getPageSize();
        int end = start + pageResponse.getContent().size() - 1;

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Range",
                "reviews " + start + "-" + end + "/" + pageResponse.getTotalElements());
        headers.add("Access-Control-Expose-Headers", "Content-Range");

        return new ResponseEntity<>(pageResponse.getContent(), headers, HttpStatus.OK);
    }


    @PostMapping
    public ResponseEntity<ReviewResponse> createReview(@RequestBody ReviewRequest reviewRequest) {
        ReviewResponse created = reviewService.createReview(reviewRequest);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @DeleteMapping("/{reviewId}")
    public ResponseEntity<Void> deleteReview(@PathVariable int reviewId) {
        reviewService.deleteReview(reviewId);
        return ResponseEntity.noContent().build();
    }
}
