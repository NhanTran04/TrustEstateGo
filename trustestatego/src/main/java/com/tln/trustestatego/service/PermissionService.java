package com.tln.trustestatego.service;

import com.tln.trustestatego.dto.request.PermissionRequest;
import com.tln.trustestatego.dto.response.PermissionResponse;

import java.util.List;

public interface PermissionService {
    List<PermissionResponse> getPermissions();
    PermissionResponse getPermissionById(int perId);
    PermissionResponse createPermission(PermissionRequest request);
    PermissionResponse updatePermission(int permissionId,PermissionRequest request);
    void deletePermission(int permissionId);
}
