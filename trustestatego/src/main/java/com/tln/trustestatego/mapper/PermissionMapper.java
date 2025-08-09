package com.tln.trustestatego.mapper;

import com.tln.trustestatego.dto.request.PermissionRequest;
import com.tln.trustestatego.dto.request.PropertyRequest;
import com.tln.trustestatego.dto.response.PermissionResponse;
import com.tln.trustestatego.dto.response.PropertyResponse;
import com.tln.trustestatego.entity.Permission;
import com.tln.trustestatego.entity.Property;
import org.mapstruct.MappingTarget;

public interface PermissionMapper {
    PermissionResponse toPermissionResponse(Permission permission);
    Permission toPermission(PermissionRequest permissionRequest);
    void update(@MappingTarget Permission permission, PermissionRequest permissionRequest);
}
