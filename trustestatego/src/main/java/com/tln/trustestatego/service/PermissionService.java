package com.tln.trustestatego.service;

import com.tln.trustestatego.dto.request.PermissionRequest;
import com.tln.trustestatego.dto.response.PermissionResponse;

import java.util.List;

public interface PermissionService {
    public List<PermissionResponse> getPermissions();
    public PermissionResponse createPermission(PermissionRequest request);
    public PermissionResponse updatePermission(int permissionId,PermissionRequest request);
    public void deletePermission(int permissionId);
}
