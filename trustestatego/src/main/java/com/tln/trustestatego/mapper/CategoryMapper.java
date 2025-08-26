package com.tln.trustestatego.mapper;

import com.tln.trustestatego.dto.request.CategoryRequest;
import com.tln.trustestatego.dto.response.CategoryResponse;
import com.tln.trustestatego.entity.Category;
import org.mapstruct.*;

@Mapper(componentModel = "spring")
public interface CategoryMapper {
    CategoryResponse toCategoryResponse(Category category);
    Category toCategory(CategoryRequest categoryRequest);
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void update(@MappingTarget Category category, CategoryRequest categoryRequest);
}
