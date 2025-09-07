package com.tln.trustestatego.service.Impl;

import com.tln.trustestatego.dto.request.RoleRequest;
import com.tln.trustestatego.dto.response.PageResponse;
import com.tln.trustestatego.dto.response.RoleResponse;
import com.tln.trustestatego.entity.Permission;
import com.tln.trustestatego.entity.Role;
import com.tln.trustestatego.entity.RolePermission;
import com.tln.trustestatego.mapper.PageMapper;
import com.tln.trustestatego.mapper.RoleMapper;
import com.tln.trustestatego.repository.PermissionRepository;
import com.tln.trustestatego.repository.RolePermissionRepository;
import com.tln.trustestatego.repository.RoleRepository;
import com.tln.trustestatego.service.RoleService;
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

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Transactional
public class RoleServiceImpl implements RoleService {
    private final RolePermissionRepository rolePermissionRepository;
    RoleRepository roleRepository;
    RoleMapper roleMapper;
    PageMapper pageMapper;
    PermissionRepository permissionRepository;

    public PageResponse<RoleResponse> getRoles(Pageable pageable){
        Page<RoleResponse> rolePage =  roleRepository.findAll(pageable)
                .map(roleMapper::toRoleResponse);
        return pageMapper.toPageResponse(rolePage);
    }

    private void setRolePermissions(Role role, Set<Integer> permissionIds) {
        if (permissionIds != null && !permissionIds.isEmpty()) {
            Set<Permission> permissions = new HashSet<>(permissionRepository.findAllById(permissionIds));

            Set<RolePermission> rolePermissions = permissions.stream().map(p -> {
                RolePermission rp = new RolePermission();
                rp.setRole(role);
                rp.setPermission(p);
                return rp;
            }).collect(Collectors.toSet());

            role.setRolePermissions(rolePermissions);
        } else {
            role.setRolePermissions(new HashSet<>()); // clear nếu không truyền gì
        }
    }

    public RoleResponse createRole(RoleRequest request){
        Role role = roleMapper.toRole(request);
        setRolePermissions(role, request.getPermissions());
        role = roleRepository.save(role);
        return roleMapper.toRoleResponse(role);
    }

    public RoleResponse updateRole(int roleId,RoleRequest roleRequest){
        Role role = roleRepository.findById(roleId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Role not found"));

        roleMapper.update(role, roleRequest);
        setRolePermissions(role, roleRequest.getPermissions());
        return roleMapper.toRoleResponse(roleRepository.save(role));
    }

    @Override
    public void deleteRole(int roleId) {
        roleRepository.deleteById(roleId);
    }
}
