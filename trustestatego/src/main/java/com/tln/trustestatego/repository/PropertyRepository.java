package com.tln.trustestatego.repository;

import com.tln.trustestatego.entity.Property;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PropertyRepository extends JpaRepository<Property, Integer> {
}
