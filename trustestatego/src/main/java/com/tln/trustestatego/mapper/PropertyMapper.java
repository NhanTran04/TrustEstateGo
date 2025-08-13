package com.tln.trustestatego.mapper;


import com.tln.trustestatego.dto.request.PropertyRequest;
import com.tln.trustestatego.dto.response.PropertyResponse;
import com.tln.trustestatego.entity.Property;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface PropertyMapper {
    Property toProperty(PropertyRequest propertyRequest);
    @Mapping(source = "user.id", target = "userId")
    @Mapping(source = "category.id", target = "categoryId")
    PropertyResponse toPropertyResponse(Property property);
    void update(@MappingTarget Property property, PropertyRequest propertyRequest);
}
