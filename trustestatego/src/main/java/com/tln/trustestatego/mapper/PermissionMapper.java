package com.tln.trustestatego.mapper;

import com.tln.trustestatego.dto.request.PermissionRequest;
import com.tln.trustestatego.dto.request.PropertyRequest;
import com.tln.trustestatego.dto.response.PermissionResponse;
import com.tln.trustestatego.dto.response.PropertyResponse;
import com.tln.trustestatego.entity.Permission;
import com.tln.trustestatego.entity.Property;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(componentModel = "spring")
public interface PermissionMapper {
    PermissionResponse toPermissionResponse(Permission permission);
    Permission toPermission(PermissionRequest permissionRequest);
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void update(@MappingTarget Permission permission, PermissionRequest permissionRequest);
}
