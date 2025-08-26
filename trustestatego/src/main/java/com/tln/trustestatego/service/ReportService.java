package com.tln.trustestatego.service;

import com.tln.trustestatego.dto.request.ReportUserRequest;
import com.tln.trustestatego.dto.response.PageResponse;
import com.tln.trustestatego.dto.response.ReportResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ReportService {
    PageResponse<ReportResponse> getReports(String keyword, Pageable pageable);
    PageResponse<ReportResponse> getReportByUserId(int userId, Pageable pageable);
    ReportResponse createReport(ReportUserRequest reportUserRequest, int userId, int propertyId);
    ReportResponse updateReport(int reportId);
    void deleteReport(int reportId);
}
