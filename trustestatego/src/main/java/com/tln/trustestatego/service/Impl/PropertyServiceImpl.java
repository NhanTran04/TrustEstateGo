package com.tln.trustestatego.service.Impl;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.tln.trustestatego.dto.request.PropertyRequest;
import com.tln.trustestatego.dto.response.PropertyResponse;
import com.tln.trustestatego.entity.Property;
import com.tln.trustestatego.entity.PropertyImage;
import com.tln.trustestatego.mapper.PropertyMapper;
import com.tln.trustestatego.repository.CategoryRepository;
import com.tln.trustestatego.repository.PropertyRepository;
import com.tln.trustestatego.repository.UserRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class PropertyServiceImpl implements com.tln.trustestatego.service.PropertyService {

    PropertyMapper propertyMapper;

    PropertyRepository propertyRepository;

    CategoryRepository categoryRepository;

    UserRepository userRepository;

    Cloudinary cloudinary;

    @Override
    public List<PropertyResponse> getProperties(){
        return propertyRepository.findAll()
                .stream()
                .map(propertyMapper::toPropertyResponse)
                .collect(Collectors.toList());
    }

    @Override
    public PropertyResponse getPropertyById(int propertyId){
        Property property = propertyRepository.findById(propertyId)
                .orElseThrow(() -> new RuntimeException("Property not found "));
        return propertyMapper.toPropertyResponse(property);
    }

    @Override
    public PropertyResponse createProperty(PropertyRequest propertyRequest) {
        Property property = propertyMapper.toProperty(propertyRequest);

        property.setCategory(categoryRepository.findById(propertyRequest.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found")));
        property.setUser(userRepository.findById(propertyRequest.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found")));
        property.setCreatedAt(LocalDateTime.now());

        // Xử lý ảnh
        if (propertyRequest.getImages() != null && propertyRequest.getImages().length > 0) {
            Set<PropertyImage> propertyImages = uploadPropertyImages(propertyRequest.getImages(), property);
            property.setPropertyImages(propertyImages);
        }

        return propertyMapper.toPropertyResponse(propertyRepository.save(property));
    }

    @Override
    public PropertyResponse updateProperty(int propertyId, PropertyRequest propertyRequest) {
        Property property = propertyRepository.findById(propertyId)
                .orElseThrow(() -> new RuntimeException("Property not found"));

        propertyMapper.update(property, propertyRequest);

        if (propertyRequest.getImages() != null && propertyRequest.getImages().length > 0) {
            // Xóa ảnh cũ nếu muốn
            property.getPropertyImages().clear();

            // Thêm ảnh mới
            Set<PropertyImage> newImages = uploadPropertyImages(propertyRequest.getImages(), property);
            property.getPropertyImages().addAll(newImages);
        }

        return propertyMapper.toPropertyResponse(propertyRepository.save(property));
    }

    private Set<PropertyImage> uploadPropertyImages(MultipartFile[] images, Property property) {
        Set<PropertyImage> propertyImages = new HashSet<>();
        if (images != null && images.length > 0) {
            for (MultipartFile file : images) {
                if (!file.isEmpty()) {
                    try {
                        Map res = cloudinary.uploader().upload(file.getBytes(),
                                ObjectUtils.asMap("resource_type", "auto"));
                        String imageUrl = res.get("secure_url").toString();
                        PropertyImage image = new PropertyImage();
                        image.setImageUrl(imageUrl);
                        image.setProperty(property);
                        propertyImages.add(image);
                    } catch (Exception ex) {
                        throw new RuntimeException("Error uploading image: " + file.getOriginalFilename(), ex);
                    }
                }
            }
        }
        return propertyImages;
    }

    @Override
    public void deleteProperty(int propertyId){
        propertyRepository.deleteById(propertyId);
    }

}
