package com.tln.trustestatego.service;

import com.tln.trustestatego.dto.request.CategoryRequest;
import com.tln.trustestatego.dto.request.PropertyRequest;
import com.tln.trustestatego.dto.request.PropertySaveRequest;
import com.tln.trustestatego.dto.response.CategoryResponse;
import com.tln.trustestatego.dto.response.PropertyResponse;
import com.tln.trustestatego.dto.response.PropertySaveResponse;

import java.util.List;

public interface PropertySaveService {
    List<PropertySaveResponse> getPropertyByUserId(int userId);
    void saveProperty(PropertySaveRequest propertySaveRequest);
    void deleteById(int propertySaveId);
}
