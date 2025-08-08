package com.tln.trustestatego.controller;

import com.tln.trustestatego.dto.request.CategoryRequest;
import com.tln.trustestatego.dto.response.ApiResponse;
import com.tln.trustestatego.dto.response.CategoryResponse;
import com.tln.trustestatego.service.CategoryService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/categories")
@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class CategoryController {
    CategoryService categoryService;

    @GetMapping
    ApiResponse<List<CategoryResponse>> getCategories(){
        return ApiResponse.<List<CategoryResponse>>builder()
                .result(categoryService.getCategories())
                .build();
    }

    @PostMapping
    ApiResponse<CategoryResponse> createCategory(@RequestBody CategoryRequest categoryRequest){
        return ApiResponse.<CategoryResponse>builder()
                .result(categoryService.createCategory(categoryRequest))
                .build();

    }

    @PutMapping("/{cateId}")
    ApiResponse<CategoryResponse> updateCategory(@PathVariable int cateId,@RequestBody CategoryRequest categoryRequest){
        return ApiResponse.<CategoryResponse>builder()
                .result(categoryService.updateCategory(cateId,categoryRequest))
                .build();

    }

    @DeleteMapping("/{cateId}")
    void deleteCategory(@PathVariable int cateId){
        categoryService.deleteCategory(cateId);
    }
}
