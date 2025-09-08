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

    public List<RoleResponse> getRoles(){
        return roleRepository
                .findAll()
                .stream()
                .map(roleMapper::toRoleResponse)
                .toList();
    }

    @Override
    public RoleResponse getRoleById(int roleId) {
        return roleRepository
                .findById(roleId)
                .map(roleMapper::toRoleResponse)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Role not found"));
    }

//    private void setRolePermissions(Role role, Set<Integer> permissionIds) {
//        if (permissionIds != null && !permissionIds.isEmpty()) {
//            Set<Permission> permissions = new HashSet<>(permissionRepository.findAllById(permissionIds));
//
//            Set<RolePermission> rolePermissions = permissions.stream().map(p -> {
//                RolePermission rp = new RolePermission();
//                rp.setRole(role);
//                rp.setPermission(p);
//                return rp;
//            }).collect(Collectors.toSet());
//
//            role.setRolePermissions(rolePermissions);
//        } else {
//            role.setRolePermissions(new HashSet<>()); // clear nếu không truyền gì
//        }
//    }

    private void setRolePermissions(Role role, Set<Integer> newPermissionIds) {
        if (newPermissionIds == null) {
            newPermissionIds = new HashSet<>();
        }

        // Lấy danh sách hiện tại trong DB
        Set<Integer> currentPermissionIds = role.getRolePermissions()
                .stream()
                .map(rp -> rp.getPermission().getId())
                .collect(Collectors.toSet());

        // Tìm permission cần thêm
        Set<Integer> toAdd = new HashSet<>(newPermissionIds);
        toAdd.removeAll(currentPermissionIds);

        // Tìm permission cần xóa
        Set<Integer> toRemove = new HashSet<>(currentPermissionIds);
        toRemove.removeAll(newPermissionIds);

        // Xóa rolePermission khỏi entity
        role.getRolePermissions().removeIf(rp -> toRemove.contains(rp.getPermission().getId()));

        // Thêm rolePermission mới
        if (!toAdd.isEmpty()) {
            Set<Permission> permissions = new HashSet<>(permissionRepository.findAllById(toAdd));
            for (Permission p : permissions) {
                RolePermission rp = new RolePermission();
                rp.setRole(role);
                rp.setPermission(p);
                role.getRolePermissions().add(rp);
            }
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
        Role saved = roleRepository.save(role);
        return roleMapper.toRoleResponse(saved);
    }

    @Override
    public void deleteRole(int roleId) {
        roleRepository.deleteById(roleId);
    }
}
