package com.tln.trustestatego.mapper;

import com.tln.trustestatego.dto.request.RoleRequest;
import com.tln.trustestatego.dto.response.PermissionResponse;
import com.tln.trustestatego.dto.response.RoleResponse;
import com.tln.trustestatego.entity.Permission;
import com.tln.trustestatego.entity.Role;
import com.tln.trustestatego.entity.RolePermission;
import org.mapstruct.*;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Set;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring", nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface RoleMapper {
    Role toRole(RoleRequest roleRequest);
    @Mapping(target = "permissions", source = "rolePermissions")
    RoleResponse toRoleResponse(Role role);
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void update(@MappingTarget Role role, RoleRequest roleRequest);

    PermissionResponse toPermissionResponse(Permission permission);

    default Set<PermissionResponse> mapRolePermissions(Set<RolePermission> rolePermissions){
        if(rolePermissions == null)
            return  null;
        return rolePermissions
                .stream()
                .map(RolePermission::getPermission)
                .map(this::toPermissionResponse)
                .collect(Collectors.toSet());
    }
}
