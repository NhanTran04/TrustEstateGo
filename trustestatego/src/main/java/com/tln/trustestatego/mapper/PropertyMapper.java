package com.tln.trustestatego.mapper;


import com.tln.trustestatego.document.PropertyDocument;
import com.tln.trustestatego.dto.request.PropertyRequest;
import com.tln.trustestatego.dto.response.PropertyResponse;
import com.tln.trustestatego.entity.Property;
import com.tln.trustestatego.entity.PropertyImage;
import org.mapstruct.*;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import java.time.ZoneOffset;
import java.time.Instant;
import java.time.LocalDateTime;

@Mapper(componentModel = "spring")
public interface PropertyMapper {
    Property toProperty(PropertyRequest propertyRequest);
    @Mapping(source = "category.name", target = "categoryName")
    @Mapping(source = "category.id", target = "categoryId")
    @Mapping(source = "user.id", target = "userId")
    @Mapping(target = "images", expression = "java(mapImages(property.getPropertyImages()))")
    PropertyResponse toPropertyResponse(Property property);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void update(@MappingTarget Property property, PropertyRequest propertyRequest);

    @Mapping(target = "createdAt", expression = "java(toInstant(property.getCreatedAt()))")
    @Mapping(target = "expireAt", expression = "java(toInstant(property.getExpireAt()))")
    PropertyDocument toPropertyDocument(Property property);

    default List<String> mapImages(Set<PropertyImage> proImages){
        if(proImages == null)
            return null;
        return proImages.stream().map(PropertyImage::getImageUrl).collect(Collectors.toList());
    }

    default Instant toInstant(LocalDateTime time) {
        return time != null ? time.toInstant(ZoneOffset.UTC) : null;
    }
}
