package com.tln.trustestatego.service;

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
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.*;
import java.util.logging.Level;
import java.util.logging.Logger;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class PropertyService {

    PropertyMapper propertyMapper;

    PropertyRepository propertyRepository;

    CategoryRepository categoryRepository;

    UserRepository userRepository;

    Cloudinary cloudinary;

    public List<PropertyResponse> getProperties(){
        return propertyRepository.findAll()
                .stream()
                .map(propertyMapper::toPropertyResponse)
                .collect(Collectors.toList());
    }

    public PropertyResponse getPropertyById(int propertyId){
        Property property = propertyRepository.findById(propertyId)
                .orElseThrow(() -> new RuntimeException("Property not found "));
        return propertyMapper.toPropertyResponse(property);
    }

    public PropertyResponse createProperty(PropertyRequest propertyRequest){
        Property property = propertyMapper.toProperty(propertyRequest);
        property.setCategory(categoryRepository.findById(propertyRequest.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found")));
        property.setUser(userRepository.findById(propertyRequest.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found")));
        property.setCreatedAt(LocalDateTime.now());
        Set<PropertyImage> propertyImages = new HashSet<>();
        if(propertyRequest.getImages() != null && propertyRequest.getImages().length >0){
            try {
                for (MultipartFile file : propertyRequest.getImages()) {
                    if (!file.isEmpty()) {
                        Map res = cloudinary.uploader().upload(file.getBytes(),
                                ObjectUtils.asMap("resource_type", "auto"));
                        String imageUrl = res.get("secure_url").toString();
                        PropertyImage image = new PropertyImage();
                        image.setImageUrl(imageUrl);
                        image.setProperty(property);
                        propertyImages.add(image);
                    }
                }
            } catch (Exception ex) {
                Logger.getLogger(PropertyService.class.getName()).log(Level.SEVERE, null, ex);
            }
        }
        property.setPropertyImages(propertyImages);
        return propertyMapper.toPropertyResponse(propertyRepository.save(property));
    }

    public PropertyResponse updateProperty(int propertyId,
                                           PropertyRequest propertyRequest){
        Property property = propertyRepository.findById(propertyId).orElseThrow(()
                -> new RuntimeException("Property not found "));
        propertyMapper.update(property,propertyRequest);
        return propertyMapper.toPropertyResponse(property);
    }

    public void deleteProperty(int propertyId){
        propertyRepository.deleteById(propertyId);
    }

}
