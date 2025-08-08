package com.tln.trustestatego.mapper;

import com.tln.trustestatego.dto.request.RoleRequest;
import com.tln.trustestatego.dto.response.RoleResponse;
import com.tln.trustestatego.entity.Role;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface RoleMapper {
    Role toRole(RoleRequest roleRequest);
    RoleResponse toRoleResponse(Role role);
    void update(@MappingTarget Role role, RoleRequest roleRequest);
}
