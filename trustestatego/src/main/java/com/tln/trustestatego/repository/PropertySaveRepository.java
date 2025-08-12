package com.tln.trustestatego.repository;

import com.tln.trustestatego.entity.PropertySave;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PropertySaveRepository extends JpaRepository<PropertySave, Integer> {
    List<PropertySave> findByUserId(int userId);
    Optional<PropertySave> findByUserIdAndPropertyId(int userId, int propertyId);
    boolean existByUserIdAndPropertyId(int userId, int propertyId);
}
