package com.tln.trustestatego.service;

import com.tln.trustestatego.document.PropertyDocument;
import com.tln.trustestatego.dto.request.PropertyRequest;
import com.tln.trustestatego.dto.response.PageResponse;
import com.tln.trustestatego.dto.response.PropertyResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Map;

public interface PropertyService {
    PageResponse<PropertyResponse> getProperties(Pageable pageable);
    PageResponse<PropertyResponse> getPropertyFromAdmin(Map<String, String> params,Pageable pageable);
    PageResponse<PropertyResponse> getPropertyByUserId(int userId,Pageable pageable);
    PropertyResponse getPropertyById(int propertyId);
    PropertyResponse createProperty(PropertyRequest propertyRequest);
    PropertyResponse updateProperty(int propertyId,
                                           PropertyRequest propertyRequest);
    PageResponse<PropertyDocument> searchProperty(Map<String, String> params, Pageable pageable);
    void deleteProperty(int propertyId);
}
