package com.tln.trustestatego.service.Impl;

import com.tln.trustestatego.dto.request.PermissionRequest;
import com.tln.trustestatego.dto.response.PageResponse;
import com.tln.trustestatego.dto.response.PermissionResponse;
import com.tln.trustestatego.entity.Permission;
import com.tln.trustestatego.mapper.PageMapper;
import com.tln.trustestatego.mapper.PermissionMapper;
import com.tln.trustestatego.repository.PermissionRepository;
import com.tln.trustestatego.service.PermissionService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class PermissionServiceImpl implements PermissionService {

    PermissionMapper permissionMapper;

    PermissionRepository permissionRepository;

    PageMapper pageMapper;

    @Override
    public PageResponse<PermissionResponse> getPermissions(String kw, Pageable pageable) {
        Page<PermissionResponse> page;
        if (kw == null || kw.isBlank()) {
            page = permissionRepository.findAll(pageable)
                    .map(permissionMapper::toPermissionResponse);
        } else {
            page = permissionRepository.findByNameContainingIgnoreCase(kw, pageable).map(permissionMapper::toPermissionResponse);
        }

        return pageMapper.toPageResponse(page);
    }

    @Override
    public PermissionResponse getPermissionById(int perId) {
        return permissionRepository.findById(perId)
                .map(permissionMapper::toPermissionResponse)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Permission not found"));
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
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Permission not found"));
        permissionMapper.update(permission, request);
        return permissionMapper.toPermissionResponse(permissionRepository.save(permission));
    }

    @Override
    public void deletePermission(int permissionId) {
        permissionRepository.deleteById(permissionId);
    }
}
