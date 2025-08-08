package com.tln.trustestatego.controller;

import com.tln.trustestatego.dto.request.CategoryRequest;
import com.tln.trustestatego.dto.request.PropertyRequest;
import com.tln.trustestatego.dto.response.ApiResponse;
import com.tln.trustestatego.dto.response.CategoryResponse;
import com.tln.trustestatego.dto.response.PropertyResponse;
import com.tln.trustestatego.service.CategoryService;
import com.tln.trustestatego.service.PropertyService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/properties")
@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class PropertyController {
    PropertyService propertyService;

    @GetMapping
    ApiResponse<List<PropertyResponse>> getProperties(){
        return ApiResponse.<List<PropertyResponse>>builder()
                .result(propertyService.getProperties())
                .build();
    }

    @GetMapping("/{propertyId}")
    ApiResponse<PropertyResponse> getPropertyById(@PathVariable int propertyId){
        return ApiResponse.<PropertyResponse>builder()
                .result(propertyService.getPropertyById(propertyId))
                .build();
    }

    @PostMapping
    ApiResponse<PropertyResponse> createProperty(@RequestBody PropertyRequest propertyRequest){
        return ApiResponse.<PropertyResponse>builder()
                .result(propertyService.createProperty(propertyRequest))
                .build();

    }

    @PutMapping("/{propertyId}")
    ApiResponse<PropertyResponse> updateProperty(@PathVariable int propertyId,@RequestBody PropertyRequest propertyRequest){
        return ApiResponse.<PropertyResponse>builder()
                .result(propertyService.updateProperty(propertyId,propertyRequest))
                .build();

    }

    @DeleteMapping("/{cateId}")
    void deleteCategory(@PathVariable int cateId){
        propertyService.deleteProperty(cateId);
    }
}
