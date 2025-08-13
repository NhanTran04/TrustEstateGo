package com.tln.trustestatego.repository;

import com.tln.trustestatego.dto.response.ReportResponse;
import com.tln.trustestatego.entity.Report;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ReportRepository extends JpaRepository<Report, Integer> {
    boolean existsByUserIdAndPropertyId(int userId, int postId);
    Page<Report> findByProperty_NameContainingIgnoreCase(String keyword, Pageable pageable);
    Page<Report> findByUserId(int userId, Pageable pageable);
}
