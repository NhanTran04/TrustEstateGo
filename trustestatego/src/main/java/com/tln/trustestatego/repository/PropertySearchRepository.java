package com.tln.trustestatego.repository;

import com.tln.trustestatego.document.PropertyDocument;
import com.tln.trustestatego.dto.response.PropertyResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Map;

public interface PropertySearchRepository extends ElasticsearchRepository<PropertyDocument, String> {
//    Page<PropertyResponse> findByTitleContainingIgnoreCaseOrLocationContainingIgnoreCaseAndPriceBetween
//            (Map<String, String> params);
//Page<PropertyDocument> findByTitleContainingOrLocationContaining(
//        String title, String location, Pageable pageable);
//
//    // Tìm chỉ trong title
//    Page<PropertyDocument> findByTitleContaining(String title, Pageable pageable);
//
//    // Tìm chỉ trong location
//    Page<PropertyDocument> findByLocationContaining(String location, Pageable pageable);
//
//    // Filter theo propertyType
//    Page<PropertyDocument> findByPropertyType(String propertyType, Pageable pageable);
//
//    // Filter theo isActive
//    Page<PropertyDocument> findByIsActive(Boolean isActive, Pageable pageable);
//
//    // Kết hợp: keyword + isActive
//    Page<PropertyDocument> findByTitleContainingOrLocationContainingAndIsActive(
//            String title, String location, Boolean isActive, Pageable pageable);
//
//    // Kết hợp: keyword + propertyType
//    Page<PropertyDocument> findByTitleContainingOrLocationContainingAndPropertyType(
//            String title, String location, String propertyType, Pageable pageable);
//
//    // Kết hợp: keyword + isActive + propertyType
//    Page<PropertyDocument> findByTitleContainingOrLocationContainingAndIsActiveAndPropertyType(
//            String title, String location, Boolean isActive, String propertyType, Pageable pageable);
}
