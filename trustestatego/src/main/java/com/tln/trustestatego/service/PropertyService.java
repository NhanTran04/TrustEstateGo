package com.tln.trustestatego.service;

import com.tln.trustestatego.dto.request.PropertyRequest;
import com.tln.trustestatego.dto.response.PropertyResponse;

import java.util.List;

public interface PropertyService {
    List<PropertyResponse> getProperties();
    PropertyResponse getPropertyById(int propertyId);
    PropertyResponse createProperty(PropertyRequest propertyRequest);
    PropertyResponse updateProperty(int propertyId,
                                           PropertyRequest propertyRequest);
    void deleteProperty(int propertyId);
}
