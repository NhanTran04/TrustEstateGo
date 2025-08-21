package com.tln.trustestatego.service.Impl;

import co.elastic.clients.elasticsearch._types.query_dsl.BoolQuery;
import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.tln.trustestatego.document.PropertyDocument;
import com.tln.trustestatego.dto.request.PropertyRequest;
import com.tln.trustestatego.dto.response.PropertyResponse;
import com.tln.trustestatego.entity.Property;
import com.tln.trustestatego.entity.PropertyImage;
import com.tln.trustestatego.mapper.PropertyMapper;
import com.tln.trustestatego.repository.CategoryRepository;
import com.tln.trustestatego.repository.PropertyRepository;
import com.tln.trustestatego.repository.PropertySearchRepository;
import com.tln.trustestatego.repository.UserRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.elasticsearch.client.elc.ElasticsearchTemplate;
import org.springframework.data.elasticsearch.core.ElasticsearchOperations;
import org.springframework.data.elasticsearch.core.SearchHit;
import org.springframework.data.elasticsearch.core.SearchHits;
import org.springframework.data.elasticsearch.core.query.Criteria;
import org.springframework.data.elasticsearch.core.query.CriteriaQuery;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;
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

    ElasticsearchOperations elasticsearchOperations;

    PropertySearchRepository propertySearchRepository;

    @Override
    public Page<PropertyResponse> getProperties(Pageable pageable){
        Page<Property> propertiesPage = propertyRepository.findAll(pageable);
        return propertiesPage.map(propertyMapper::toPropertyResponse);
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

    @Override
    public Page<PropertyDocument> searchProperty(Map<String,String> params, Pageable pageable) {
        Criteria criteria = new Criteria();

        String keyword = params.get("keyword");
        if(keyword != null && !keyword.isEmpty())
            criteria = criteria.and(new Criteria("title").matches(keyword));

        String minPriceStr = params.get("minPrice");
        String maxPriceStr = params.get("maxPrice");
        if(minPriceStr != null && maxPriceStr != null)
        {
            BigDecimal minPrice = minPriceStr != null ? new BigDecimal(minPriceStr) : BigDecimal.ZERO;
            BigDecimal maxPrice = maxPriceStr != null ? new BigDecimal(maxPriceStr) : new BigDecimal(Double.MAX_VALUE);
            criteria = criteria.and(new Criteria("price").between(minPrice,maxPrice));
        }

        String propertyType = params.get("propertyType");
        if (propertyType != null && !propertyType.isEmpty()) {
            criteria = criteria.and(new Criteria("propertyType").is(propertyType));
        }

        CriteriaQuery query = new CriteriaQuery(criteria).setPageable(pageable);
        SearchHits<PropertyDocument> hits = elasticsearchOperations.search(query, PropertyDocument.class);

        List<PropertyDocument> docs = hits.getSearchHits().stream()
                .map(SearchHit::getContent)
                .toList();
        return new PageImpl<>(docs, pageable, hits.getTotalHits());

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
