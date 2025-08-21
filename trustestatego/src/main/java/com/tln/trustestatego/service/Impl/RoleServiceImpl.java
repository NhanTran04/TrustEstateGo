package com.tln.trustestatego.service.Impl;

import com.tln.trustestatego.dto.request.RoleRequest;
import com.tln.trustestatego.dto.response.RoleResponse;
import com.tln.trustestatego.entity.Role;
import com.tln.trustestatego.mapper.RoleMapper;
import com.tln.trustestatego.repository.RoleRepository;
import com.tln.trustestatego.service.RoleService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Transactional
public class RoleServiceImpl implements RoleService {
    RoleRepository roleRepository;
    RoleMapper roleMapper;

    public Page<RoleResponse> getRoles(Pageable pageable){
        return roleRepository.findAll(pageable)
                .map(roleMapper::toRoleResponse);
    }

    public RoleResponse createRole(RoleRequest request){
        Role role = roleMapper.toRole(request);

//        var permissions = permissionRepository.findAllById(request.getPermissions());
//        role.setPermissions(new HashSet<>(permissions));
        role = roleRepository.save(role);
        return roleMapper.toRoleResponse(role);

    }

    public RoleResponse updateRole(int roleId,RoleRequest roleRequest){
        Role role = roleRepository.findById(roleId)
                .orElseThrow(() -> new RuntimeException("Role not found"));

        roleMapper.update(role, roleRequest);
        return roleMapper.toRoleResponse(roleRepository.save(role));

    }

    @Override
    public void deleteRole(int roleId) {
        roleRepository.deleteById(roleId);
    }
}
