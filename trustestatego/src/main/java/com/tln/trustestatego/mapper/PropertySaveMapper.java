package com.tln.trustestatego.mapper;

import com.tln.trustestatego.dto.request.CategoryRequest;
import com.tln.trustestatego.dto.request.PropertySaveRequest;
import com.tln.trustestatego.dto.response.CategoryResponse;
import com.tln.trustestatego.dto.response.PropertySaveResponse;
import com.tln.trustestatego.entity.Category;
import com.tln.trustestatego.entity.PropertySave;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface PropertySaveMapper {
    PropertySave toPropertySave(PropertySaveRequest propertySaveRequest);
    @Mapping(source = "user.id", target = "userId")
    @Mapping(source = "property.title", target = "propertyTitle")
    @Mapping(target = "propertyImage",
        expression = "java(propertySave.getProperty().getPropertyImages().isEmpty() ? null \" +\n" +
                "                \": propertySave.getProperty().getPropertyImages().iterator().next().getImageUrl())"
    )
    PropertySaveResponse toPropertySaveResponse(PropertySave propertySave);
}
