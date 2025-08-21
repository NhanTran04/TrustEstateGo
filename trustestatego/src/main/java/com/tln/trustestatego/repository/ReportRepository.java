package com.tln.trustestatego.repository;

import com.tln.trustestatego.entity.Report;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReportRepository extends JpaRepository<Report, Integer> {
    boolean existsByUserIdAndPropertyId(int userId, int postId);
    Page<Report> findByProperty_TitleContainingIgnoreCase(String keyword, Pageable pageable);
    Page<Report> findByUser_Id(int userId, Pageable pageable);
}
