package com.tln.trustestatego.repository;

import com.tln.trustestatego.entity.Report;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReportRepository extends JpaRepository<Report, Integer> {
    boolean existsByUserIdAndPostId(int userId, int postId);
}
