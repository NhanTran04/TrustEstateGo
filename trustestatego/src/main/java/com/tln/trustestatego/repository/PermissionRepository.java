package com.tln.trustestatego.repository;

import com.tln.trustestatego.entity.Permission;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PermissionRepository extends JpaRepository<Permission, Integer> {
}
