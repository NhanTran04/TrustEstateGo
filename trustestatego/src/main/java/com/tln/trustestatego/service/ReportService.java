package com.tln.trustestatego.service;

import com.tln.trustestatego.dto.request.ReportUserRequest;
import com.tln.trustestatego.dto.response.ReportResponse;

import java.util.List;

public interface ReportService {
    List<ReportResponse> getReports();
    ReportResponse createReport(ReportUserRequest reportUserRequest);
    ReportResponse updateReport(int reportId);
    void deleteReport(int reportId);
}
