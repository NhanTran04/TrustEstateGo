package com.tln.trustestatego.service;

import com.tln.trustestatego.dto.request.CategoryRequest;
import com.tln.trustestatego.dto.response.CategoryResponse;
import com.tln.trustestatego.entity.Category;
import com.tln.trustestatego.mapper.CategoryMapper;
import com.tln.trustestatego.repository.CategoryRepository;
import lombok.*;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class CategoryService {
    CategoryRepository categoryRepository;

    CategoryMapper categoryMapper;

    public List<CategoryResponse> getCategories(){
        return categoryRepository.findAll()
                .stream()
                .map(categoryMapper::toCategoryResponse)
                .collect(Collectors.toList());
    }

    public CategoryResponse createCategory(CategoryRequest categoryRequest){
        Category cate = categoryMapper.toCategory(categoryRequest);
        return categoryMapper.toCategoryResponse(categoryRepository.save(cate));
    }

    public CategoryResponse updateCategory(int cateId, CategoryRequest categoryRequest){
        Category cate = categoryRepository.findById(cateId).orElseThrow(() ->new RuntimeException("User not found"));
        categoryMapper.update(cate,categoryRequest);
        return categoryMapper.toCategoryResponse(categoryRepository.save(cate));
    }

    public void deleteCategory(int cateId){
        categoryRepository.deleteById(cateId);
    }

}
