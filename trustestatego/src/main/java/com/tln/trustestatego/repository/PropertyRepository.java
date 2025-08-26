package com.tln.trustestatego.repository;

import com.tln.trustestatego.entity.Property;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PropertyRepository extends JpaRepository<Property, Integer> {
    Page<Property> findByUser_Id(int userId, Pageable pageable);
}
