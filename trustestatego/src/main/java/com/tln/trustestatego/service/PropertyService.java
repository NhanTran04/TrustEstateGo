package com.tln.trustestatego.service;

import com.tln.trustestatego.dto.request.PropertyRequest;
import com.tln.trustestatego.dto.response.PropertyResponse;

import java.util.List;

public interface PropertyService {
    public List<PropertyResponse> getProperties();
    public PropertyResponse getPropertyById(int propertyId);
    public PropertyResponse createProperty(PropertyRequest propertyRequest);
    public PropertyResponse updateProperty(int propertyId,
                                           PropertyRequest propertyRequest);
    public void deleteProperty(int propertyId);
}
