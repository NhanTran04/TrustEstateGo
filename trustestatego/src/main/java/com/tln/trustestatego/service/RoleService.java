package com.tln.trustestatego.service;

import com.tln.trustestatego.dto.request.RoleRequest;
import com.tln.trustestatego.dto.response.RoleResponse;

import java.util.List;

public interface RoleService {
    List<RoleResponse> getRoles();
    RoleResponse createRole(RoleRequest request);
    RoleResponse updateRole(int roleId, RoleRequest roleRequest);


}
