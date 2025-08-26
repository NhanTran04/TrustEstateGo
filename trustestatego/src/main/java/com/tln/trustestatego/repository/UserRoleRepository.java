package com.tln.trustestatego.repository;

import com.tln.trustestatego.entity.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRoleRepository extends JpaRepository<UserRole, Integer> {
    boolean existsByUserIdAndRoleId(int userId, int roleId);

}
