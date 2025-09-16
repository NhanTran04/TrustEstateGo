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
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(componentModel = "spring", nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface PropertySaveMapper {
    PropertySave toPropertySave(PropertySaveRequest propertySaveRequest);
    @Mapping(source = "property.title", target = "propertyTitle")
    @Mapping(target = "propertyImage",
            expression = "java(propertySave.getProperty().getPropertyImages().isEmpty() ? null : propertySave.getProperty().getPropertyImages().iterator().next().getImageUrl())"
    )
    @Mapping(source = "property.id", target = "propertyId")
    @Mapping(source = "property.price", target = "propertyPrice")
    @Mapping(source = "property.location", target = "propertyLocation")
    @Mapping(source = "property.bedroom", target = "propertyBedroom")
    @Mapping(source = "property.interior", target = "propertyInterior")
    @Mapping(source = "property.createdAt", target = "propertyCreatedAt")
    @Mapping(source = "property.category.name", target = "categoryName")
    @Mapping(source = "property.area", target = "propertyArea")
    PropertySaveResponse toPropertySaveResponse(PropertySave propertySave);
}
