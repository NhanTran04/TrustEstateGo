package com.tln.trustestatego.mapper;


import com.tln.trustestatego.document.PropertyDocument;
import com.tln.trustestatego.dto.request.PropertyRequest;
import com.tln.trustestatego.dto.response.PropertyResponse;
import com.tln.trustestatego.dto.response.PropertyTypeResponse;
import com.tln.trustestatego.entity.Property;
import com.tln.trustestatego.entity.PropertyImage;
import com.tln.trustestatego.enums.PropertyType;
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
    @Mapping(target = "propertyType", expression = "java(toPropertyTypeResponse(property.getPropertyType()))")
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

    default PropertyTypeResponse toPropertyTypeResponse(PropertyType type) {
        if (type == null) return null;
        return new PropertyTypeResponse(type.name(), getLabel(type), getDescription(type));
    }

    private String getLabel(PropertyType type) {
        switch (type) {
            case APARTMENT: return "Chung cư";
            case VILLA: return "Biệt thự";
            case TOWNHOUSE: return "Nhà phố";
            case RENTAL_ROOM: return "Phòng trọ";
            default: return type.name();
        }
    }

    private String getDescription(PropertyType type) {
        switch (type) {
            case APARTMENT: return "Căn hộ cao cấp, tiện nghi hiện đại";
            case VILLA: return "Villa sang trọng, không gian rộng rãi";
            case TOWNHOUSE: return "Nhà phố, shophouse, townhouse";
            case RENTAL_ROOM: return "Phòng trọ, ký túc xá giá hợp lý";
            default: return "";
        }
    }

    default Instant toInstant(LocalDateTime time) {
        return time != null ? time.toInstant(ZoneOffset.UTC) : null;
    }
}
