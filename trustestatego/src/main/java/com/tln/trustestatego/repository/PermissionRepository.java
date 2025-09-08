package com.tln.trustestatego.repository;

import com.tln.trustestatego.dto.response.PageResponse;
import com.tln.trustestatego.dto.response.PermissionResponse;
import com.tln.trustestatego.entity.Permission;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PermissionRepository extends JpaRepository<Permission, Integer> {
    Page<Permission> findByNameContainingIgnoreCase(
            String name, Pageable pageable);
}
