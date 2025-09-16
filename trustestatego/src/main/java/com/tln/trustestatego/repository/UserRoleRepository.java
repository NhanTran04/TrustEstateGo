package com.tln.trustestatego.repository;

import com.tln.trustestatego.entity.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Set;

@Transactional
public interface UserRoleRepository extends JpaRepository<UserRole, Integer> {
    boolean existsByUserIdAndRoleId(int userId, int roleId);

    // Xóa tất cả role của user
    @Modifying
    void deleteByUserId(int userId);
    List<UserRole> findByUserId(int userId);
    @Modifying
    void deleteByUserIdAndRoleId(int userId, int roleId);

    void deleteByUserIdAndRoleIdIn(Integer userId, Set<Integer> roleIds);
}
