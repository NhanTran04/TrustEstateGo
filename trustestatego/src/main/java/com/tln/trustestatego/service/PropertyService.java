package com.tln.trustestatego.service;

import com.tln.trustestatego.document.PropertyDocument;
import com.tln.trustestatego.dto.request.PropertyAdminRequest;
import com.tln.trustestatego.dto.request.PropertyRequest;
import com.tln.trustestatego.dto.response.PageResponse;
import com.tln.trustestatego.dto.response.PropertyResponse;
import com.tln.trustestatego.dto.response.PropertyTypeResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Map;

public interface PropertyService {
    PageResponse<PropertyResponse> getProperties(Integer categoryId,Pageable pageable);
    PageResponse<PropertyResponse> getPropertyFromAdmin(Map<String, String> params,Pageable pageable);
    PageResponse<PropertyResponse> getPropertyByUserId(Pageable pageable);
//    PageResponse<PropertyResponse> getPropertyBySellerId(int userId, Pageable pageable);
    PropertyResponse getPropertyById(int propertyId);
    PropertyResponse createProperty(PropertyRequest propertyRequest);
    PropertyResponse createPropertyByAdmin(PropertyAdminRequest propertyAdminRequest);
    PropertyResponse updateProperty(int propertyId,
                                           PropertyRequest propertyRequest);
    PageResponse<PropertyDocument> searchProperty(Map<String, String> params, Pageable pageable);
    void deleteProperty(int propertyId);
    List<PropertyTypeResponse> getAllPropertyTypes();
    void reindexAllProperties();

}
