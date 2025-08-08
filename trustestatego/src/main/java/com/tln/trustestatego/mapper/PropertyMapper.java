package com.tln.trustestatego.mapper;


import com.tln.trustestatego.dto.request.PropertyRequest;
import com.tln.trustestatego.dto.response.PropertyResponse;
import com.tln.trustestatego.entity.Property;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface PropertyMapper {
    PropertyResponse toPropertyResponse(Property property);
    Property toProperty(PropertyRequest propertyRequest);
    void update(@MappingTarget Property property, PropertyRequest propertyRequest);
}
