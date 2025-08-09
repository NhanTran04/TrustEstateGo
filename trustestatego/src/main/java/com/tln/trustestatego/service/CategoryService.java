package com.tln.trustestatego.service;

import com.tln.trustestatego.dto.request.CategoryRequest;
import com.tln.trustestatego.dto.response.CategoryResponse;

import java.util.List;

public interface CategoryService {
    public List<CategoryResponse> getCategories();
    public CategoryResponse createCategory(CategoryRequest categoryRequest);
    public CategoryResponse updateCategory(int cateId, CategoryRequest categoryRequest);
    public void deleteCategory(int cateId);
}
