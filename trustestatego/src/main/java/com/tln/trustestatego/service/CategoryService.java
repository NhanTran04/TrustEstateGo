package com.tln.trustestatego.service;

import com.tln.trustestatego.dto.request.CategoryRequest;
import com.tln.trustestatego.dto.response.CategoryResponse;

import java.util.List;

public interface CategoryService {
    List<CategoryResponse> getCategories();
    CategoryResponse getCategoryById(int cateId);
    CategoryResponse createCategory(CategoryRequest categoryRequest);
    CategoryResponse updateCategory(int cateId, CategoryRequest categoryRequest);
    void deleteCategory(int cateId);
}
