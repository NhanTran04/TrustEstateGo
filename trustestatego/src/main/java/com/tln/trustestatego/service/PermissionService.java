package com.tln.trustestatego.service;

import com.tln.trustestatego.dto.request.PermissionRequest;
import com.tln.trustestatego.dto.response.PageResponse;
import com.tln.trustestatego.dto.response.PermissionResponse;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface PermissionService {
    PageResponse<PermissionResponse> getPermissions(String kw,Pageable pageable);
    PermissionResponse getPermissionById(int perId);
    PermissionResponse createPermission(PermissionRequest request);
    PermissionResponse updatePermission(int permissionId,PermissionRequest request);
    void deletePermission(int permissionId);
}
