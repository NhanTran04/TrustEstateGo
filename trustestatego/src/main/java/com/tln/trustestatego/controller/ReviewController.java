package com.tln.trustestatego.controller;

import com.tln.trustestatego.dto.response.ApiResponse;
import com.tln.trustestatego.dto.response.ReviewResponse;
import com.tln.trustestatego.service.ReviewService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/reviews")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ReviewController {
    ReviewService reviewService;

    @GetMapping
    public ResponseEntity<ApiResponse<Page<ReviewResponse>>> getReviewByUserId(int buyerId, Pageable pageable){
        try{
            return ResponseEntity.ok()
                    .body(ApiResponse.<Page<ReviewResponse>>builder()
                            .result(reviewService.getReviewByUserId(buyerId, pageable))
                            .build());
        } catch (Exception e) {
            return ResponseEntity.ok()
                    .body(ApiResponse.<Page<ReviewResponse>>builder()
                            .code(HttpStatus.INTERNAL_SERVER_ERROR.value())
                            .message(e.getMessage())
                            .build());
        }
    }

    @GetMapping("/{sellerId}")
    public ResponseEntity<ApiResponse<Page<ReviewResponse>>> getReviewBySellerId(int sellerId, Pageable pageable){
        try{
            return ResponseEntity.ok()
                    .body(ApiResponse.<Page<ReviewResponse>>builder()
                            .result(reviewService.getReviewBySellerId(sellerId, pageable))
                            .build());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ApiResponse.<Page<ReviewResponse>>builder()
                            .code(HttpStatus.INTERNAL_SERVER_ERROR.value())
                            .message(e.getMessage())
                            .build());
        }
    }

//    @PostMapping
//    public ResponseEntity<ApiResponse<ReviewResponse>> createReview(@RequestBody ReviewRequest reviewRequest){
//        try{
//            return ResponseEntity.status(HttpStatus.CREATED)
//                    .body(ApiResponse.<ReviewResponse>builder()
//                            .result(reviewService.createReview(reviewRequest))
//                            .build());
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
//                    .body(ApiResponse.<ReviewResponse>builder()
//                            .code(HttpStatus.BAD_REQUEST.value())
//                            .message(e.getMessage())
//                            .build());
//        }
//    }

    @DeleteMapping("{reviewId}")
    public ResponseEntity<ApiResponse<Void>> deleteReview(@PathVariable int reviewId){
        try{
            reviewService.deleteReview(reviewId);
            return ResponseEntity.status(HttpStatus.NO_CONTENT)
                    .body(ApiResponse.<Void>builder()
                            .result(null)
                            .build());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ApiResponse.<Void>builder()
                            .code(HttpStatus.INTERNAL_SERVER_ERROR.value())
                            .message(e.getMessage())
                            .build());
        }
    }
}
