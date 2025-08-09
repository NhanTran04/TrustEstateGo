package com.tln.trustestatego.service;

import com.tln.trustestatego.dto.request.RoleRequest;
import com.tln.trustestatego.dto.response.RoleResponse;

import java.util.List;

public interface RoleService {
    public List<RoleResponse> getRoles();
    public RoleResponse createRole(RoleRequest request);
    public RoleResponse updateRole(int roleId, RoleRequest roleRequest);


}
