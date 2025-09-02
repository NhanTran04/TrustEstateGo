package com.tln.trustestatego.service.Impl;

import co.elastic.clients.elasticsearch._types.query_dsl.BoolQuery;
import co.elastic.clients.elasticsearch._types.query_dsl.Operator;
import co.elastic.clients.elasticsearch._types.query_dsl.RangeQuery;
import co.elastic.clients.elasticsearch.core.search.SuggestFuzziness;
import co.elastic.clients.json.JsonData;
import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.tln.trustestatego.document.PropertyDocument;
import com.tln.trustestatego.dto.request.PropertyRequest;
import com.tln.trustestatego.dto.response.PageResponse;
import com.tln.trustestatego.dto.response.PropertyResponse;
import com.tln.trustestatego.entity.Property;
import com.tln.trustestatego.entity.PropertyImage;
import com.tln.trustestatego.mapper.PageMapper;
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
import org.springframework.data.elasticsearch.client.elc.NativeQuery;
import org.springframework.data.elasticsearch.core.ElasticsearchOperations;
import org.springframework.data.elasticsearch.core.SearchHit;
import org.springframework.data.elasticsearch.core.SearchHits;

import org.springframework.data.elasticsearch.core.query.Criteria;
import org.springframework.data.elasticsearch.core.query.CriteriaQuery;
import org.springframework.data.elasticsearch.core.query.Query;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.*;

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

    PageMapper pageMapper;

    PropertySearchRepository propertySearchRepository;

    @Override
    public PageResponse<PropertyResponse> getProperties(Pageable pageable){
        Page<PropertyResponse> propertiesPage = propertyRepository
                .findAll(pageable).map(propertyMapper::toPropertyResponse);
        return pageMapper.toPageResponse(propertiesPage);
    }

    @Override
    public PageResponse<PropertyResponse> getPropertyFromAdmin(Map<String, String> filters, Pageable pageable) {
        // Lấy params từ React-Admin
        String keyword   = filters.getOrDefault("q", null);
        String location  = filters.getOrDefault("location", null);
        BigDecimal fromPrice = filters.containsKey("minPrice") ? new BigDecimal(filters.get("minPrice")) : null;
        BigDecimal toPrice   = filters.containsKey("maxPrice") ? new  BigDecimal(filters.get("maxPrice")) : null;
        String userIdStr = filters.get("userId");
        Integer userId = null;

        // Specification để build query động
        Specification<Property> spec = Specification.allOf();

        if (userIdStr != null && !userIdStr.isBlank()) {
            try {
                userId = Integer.parseInt(userIdStr);
            } catch (NumberFormatException e) {
                // có thể log lỗi hoặc bỏ qua
                userId = null;
            }
        }

        if (keyword != null && !keyword.isBlank()) {
            spec = spec.and((root, query, cb) ->
                    cb.like(cb.lower(root.get("title")), "%" + keyword.toLowerCase() + "%"));
        }

        if (userId != null) { // 👈 filter theo userId
            Integer finalUserId = userId;
            spec = spec.and((root, query, cb) ->
                    cb.equal(root.get("user").get("id"), finalUserId)); // root.get("user").get("id") nếu Property có relation User
        }

        if (location != null && !location.isBlank()) {
            spec = spec.and((root, query, cb) ->
                    cb.like(cb.lower(root.get("location")), "%" + location.toLowerCase() + "%"));
        }

        if (fromPrice != null) {
            spec = spec.and((root, query, cb) ->
                    cb.greaterThanOrEqualTo(root.get("price"), fromPrice));
        }

        if (toPrice != null) {
            spec = spec.and((root, query, cb) ->
                    cb.lessThanOrEqualTo(root.get("price"), toPrice));
        }

        // Query DB
        Page<Property> page = propertyRepository.findAll(spec, pageable);

        // Map sang DTO
        List<PropertyResponse> content = page.getContent()
                .stream()
                .map(propertyMapper::toPropertyResponse) // dùng MapStruct
                .toList();

        return new PageResponse<>(
                content,
                page.getSize(),
                page.getNumber(),
                page.getTotalPages(),
                page.getTotalElements()
        );
    }



    @Override
    public PageResponse<PropertyResponse> getPropertyByUserId(int userId, Pageable pageable) {
        Page<PropertyResponse> propertiesPage = propertyRepository
                .findByUser_Id(userId, pageable).map(propertyMapper::toPropertyResponse);
        return pageMapper.toPageResponse(propertiesPage);
    }



    @Override
    public PropertyResponse getPropertyById(int propertyId){
        Property property = propertyRepository.findById(propertyId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Property not found "));
        return propertyMapper.toPropertyResponse(property);
    }

    @Override
    public PropertyResponse createProperty(PropertyRequest propertyRequest) {
        Property property = propertyMapper.toProperty(propertyRequest);

        property.setCategory(categoryRepository.findById(propertyRequest.getCategoryId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Category not found")));
        property.setUser(userRepository.findById(propertyRequest.getUserId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found")));
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
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Property not found"));

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
    public PageResponse<PropertyDocument> searchProperty(Map<String,String> params, Pageable pageable) {
        Criteria criteria = new Criteria();

        // Tìm kiếm keyword
        String keyword = params.get("keyword");
        if(keyword != null && !keyword.trim().isEmpty()) {
            // Sử dụng contains() thay vì matches() để tìm kiếm partial match
//            criteria = criteria.and(new Criteria("title").contains(keyword.trim().toLowerCase()));
            criteria = criteria.and(new Criteria("title").contains(keyword.trim().toLowerCase()));
        }



        // Xử lý price range với exception handling
        try {
            String minPriceStr = params.get("minPrice");
            String maxPriceStr = params.get("maxPrice");

            BigDecimal minPrice = null;
            BigDecimal maxPrice = null;

            if(minPriceStr != null && !minPriceStr.trim().isEmpty()) {
                minPrice = new BigDecimal(minPriceStr.trim());
            }

            if(maxPriceStr != null && !maxPriceStr.trim().isEmpty()) {
                maxPrice = new BigDecimal(maxPriceStr.trim());
            }

            // Xử lý các trường hợp khác nhau
            if(minPrice != null && maxPrice != null) {
                criteria = criteria.and(new Criteria("price").between(minPrice, maxPrice));
            } else if(minPrice != null) {
                criteria = criteria.and(new Criteria("price").greaterThanEqual(minPrice));
            } else if(maxPrice != null) {
                criteria = criteria.and(new Criteria("price").lessThanEqual(maxPrice));
            }

        } catch (NumberFormatException e) {
            // Log error hoặc throw custom exception
            throw new IllegalArgumentException("Invalid price format", e);
        }

        // Property type
        String propertyType = params.get("propertyType");
        if (propertyType != null && !propertyType.trim().isEmpty()) {
            criteria = criteria.and(new Criteria("propertyType").is(propertyType.trim()));
        }

        CriteriaQuery query = new CriteriaQuery(criteria).setPageable(pageable);
        SearchHits<PropertyDocument> hits = elasticsearchOperations.search(query, PropertyDocument.class);

        List<PropertyDocument> docs = hits.getSearchHits().stream()
                .map(SearchHit::getContent)
                .toList();

        Page<PropertyDocument> page = new PageImpl<>(docs, pageable, hits.getTotalHits());
        System.out.println(query.getCriteria().toString());
        return pageMapper.toPageResponse(page);
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
