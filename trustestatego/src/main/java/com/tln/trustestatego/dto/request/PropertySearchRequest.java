package com.tln.trustestatego.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PropertySearchRequest {

    // Tìm kiếm trong title, description, location
    private String keyword;

    // Tìm kiếm cụ thể location
    private String location;

    // Filter price range
    private Double minPrice;
    private Double maxPrice;

    // Filter theo loại: "TRO", "NHA_NGUYEN_CAN", "DAT", etc.
    private String propertyType;

    // Filter theo active status
    private Boolean isActive;

    // Pagination
    private Integer page = 0;
    private Integer size = 10;

    // Sorting: "createdAt", "price", "title"
    private String sortBy = "createdAt";

    // Sort direction: "asc", "desc"
    private String sortDirection = "desc";
}