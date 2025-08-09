package com.tln.trustestatego.service.Impl;

import com.tln.trustestatego.dto.request.PermissionRequest;
import com.tln.trustestatego.dto.response.PermissionResponse;
import com.tln.trustestatego.entity.Permission;
import com.tln.trustestatego.mapper.PermissionMapper;
import com.tln.trustestatego.repository.PermissionRepository;
import com.tln.trustestatego.service.PermissionService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class PermissionServiceImpl implements PermissionService {

    PermissionMapper permissionMapper;

    PermissionRepository permissionRepository;

    @Override
    public List<PermissionResponse> getPermissions() {
        return permissionRepository.findAll()
                .stream()
                .map(permissionMapper::toPermissionResponse)
                .collect(Collectors.toList());
    }

    @Override
    public PermissionResponse createPermission(PermissionRequest request) {
        Permission permission = permissionMapper.toPermission(request);
        permission =  permissionRepository.save(permission);
        return permissionMapper.toPermissionResponse(permission);
    }

    @Override
    public PermissionResponse updatePermission(int permissionId,PermissionRequest request) {
        Permission permission = permissionRepository.findById(permissionId)
                .orElseThrow(() -> new RuntimeException("Permission not found"));
        permissionMapper.update(permission, request);
        return permissionMapper.toPermissionResponse(permissionRepository.save(permission));
    }

    @Override
    public void deletePermission(int permissionId) {
        permissionRepository.deleteById(permissionId);
    }
}
