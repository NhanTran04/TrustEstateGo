package com.tln.trustestatego.repository;

import com.tln.trustestatego.entity.Property;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface PropertyRepository extends JpaRepository<Property, Integer>, JpaSpecificationExecutor<Property> {
    @EntityGraph(attributePaths = {"category", "user", "propertyImages"})
    Page<Property> findByUser_Id(int userId, Pageable pageable);
//    Page<Property> findByCategory_Id(int categoryId, Pageable pageable);
    Page<Property> findByLocationContainingIgnoreCaseAndPriceLessThanEqualAndAreaGreaterThanEqual(
            String location, BigDecimal maxPrice, Integer minArea,
            Pageable pageable);
    long countByLocationContainingIgnoreCaseAndPriceLessThanEqualAndAreaGreaterThanEqual(
            String location, BigDecimal price, Integer area);
    @EntityGraph(attributePaths = {"category", "user", "propertyImages"})
    Page<Property> findByIsActiveTrueAndExpireAtAfter(LocalDateTime now, Pageable pageable);
    @EntityGraph(attributePaths = {"category", "user", "propertyImages"})
    Page<Property> findByCategory_IdAndIsActiveTrueAndExpireAtAfter(
            int categoryId, LocalDateTime now, Pageable pageable);
    @Query("""
    SELECT p FROM Property p
    LEFT JOIN FETCH p.category
    LEFT JOIN FETCH p.user
    LEFT JOIN FETCH p.propertyImages
    WHERE p.id = :id
""")
    Optional<Property> findByIdForIndexing(@Param("id") Integer id);
    @Query("SELECT DISTINCT p FROM Property p LEFT JOIN FETCH p.propertyImages")
    List<Property> findAllWithImages();

}
