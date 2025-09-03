package com.tln.trustestatego.mapper;

import com.tln.trustestatego.dto.request.ReviewRequest;
import com.tln.trustestatego.dto.response.ReviewResponse;
import com.tln.trustestatego.entity.Review;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface ReviewMapper {
    Review toReview(ReviewRequest reviewRequest);
    @Mapping(source = "property.id", target = "propertyId")
    @Mapping(source = "property.title", target = "propertyTitle")
    @Mapping(target = "sellerName", expression = "java(review.getSeller().getFirstName() + \" \" + review.getSeller().getLastName())")
    @Mapping(target = "buyerName", expression = "java(review.getBuyer().getFirstName() + \" \" + review.getBuyer().getLastName())")
    @Mapping(target = "propertyImage",
            expression = "java(review.getProperty().getPropertyImages().isEmpty() ? null : " +
                    "review.getProperty().getPropertyImages().iterator().next().getImageUrl())"
    )
    ReviewResponse toReviewResponse(Review review);
}
