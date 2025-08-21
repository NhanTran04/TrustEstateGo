package com.tln.trustestatego.service;

import com.tln.trustestatego.dto.request.RoleRequest;
import com.tln.trustestatego.dto.response.RoleResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface RoleService {
    Page<RoleResponse> getRoles(Pageable pageable);
    RoleResponse createRole(RoleRequest request);
    RoleResponse updateRole(int roleId, RoleRequest roleRequest);
    void deleteRole(int roleId);

}
