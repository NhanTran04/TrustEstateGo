package com.tln.trustestatego.repository;

import com.tln.trustestatego.entity.Property;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

public interface PropertyRepository extends JpaRepository<Property, Integer>, JpaSpecificationExecutor<Property> {
    Page<Property> findByUser_Id(int userId, Pageable pageable);
//    Page<Property> findByCategory_Id(int categoryId, Pageable pageable);
    Page<Property> findByLocationContainingIgnoreCaseAndPriceLessThanEqualAndAreaGreaterThanEqual(
            String location, BigDecimal maxPrice, Integer minArea,
            Pageable pageable);
    long countByLocationContainingIgnoreCaseAndPriceLessThanEqualAndAreaGreaterThanEqual(
            String location, BigDecimal price, Integer area);
    Page<Property> findByIsActiveTrueAndExpireAtAfter(LocalDateTime now, Pageable pageable);

    Page<Property> findByCategory_IdAndIsActiveTrueAndExpireAtAfter(
            int categoryId, LocalDateTime now, Pageable pageable);
}
