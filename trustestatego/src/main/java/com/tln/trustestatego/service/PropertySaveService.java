package com.tln.trustestatego.service;

import com.tln.trustestatego.dto.request.PropertySaveRequest;
import com.tln.trustestatego.dto.response.PropertySaveResponse;

import java.util.List;

public interface PropertySaveService {
    List<PropertySaveResponse> getPropertyByUserId(int userId);
    void createProperty(PropertySaveRequest propertySaveRequest);
    void deleteById(int propertySaveId);
}
