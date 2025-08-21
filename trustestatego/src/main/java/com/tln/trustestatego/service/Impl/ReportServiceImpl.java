package com.tln.trustestatego.service.Impl;

import com.tln.trustestatego.dto.request.ReportUserRequest;
import com.tln.trustestatego.dto.response.ReportResponse;
import com.tln.trustestatego.entity.Report;
import com.tln.trustestatego.mapper.ReportMapper;
import com.tln.trustestatego.repository.PropertyRepository;
import com.tln.trustestatego.repository.ReportRepository;
import com.tln.trustestatego.repository.UserRepository;
import com.tln.trustestatego.service.ReportService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ReportServiceImpl implements ReportService {
    ReportRepository reportRepository;
    ReportMapper reportMapper;
    UserRepository userRepository;
    PropertyRepository propertyRepository;

    @Override
    public Page<ReportResponse> getReports(String keyword, Pageable pageable) {
        Pageable sortPage = PageRequest.of(
                pageable.getPageNumber(),
                pageable.getPageSize(),
                Sort.by(Sort.Direction.DESC, "createdAt")
        );
        return reportRepository.findByProperty_TitleContainingIgnoreCase(keyword,sortPage)
                .map(reportMapper::toReportResponse);
    }

    @Override
    public Page<ReportResponse> getReportByUserId(int userId, Pageable pageable) {
        return reportRepository.findByUser_Id(userId, pageable).map(reportMapper::toReportResponse);
    }

    @Override
    public ReportResponse createReport(ReportUserRequest reportUserRequest) {
        boolean exists = reportRepository.existsByUserIdAndPropertyId(
                reportUserRequest.getUserId(), reportUserRequest.getPropertyId());
        if (exists) {
            throw new IllegalStateException("Bạn đã report bài này rồi");
        }

        Report report = reportMapper.toReport(reportUserRequest);

        report.setUser(userRepository.findById(reportUserRequest.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found")));
        report.setProperty(propertyRepository.findById(reportUserRequest.getPropertyId())
                .orElseThrow(() -> new RuntimeException("Property not found")));
        report.setCreatedAt(LocalDateTime.now());

        reportRepository.save(report);

        return reportMapper.toReportResponse(report);
    }

    @Override
    public ReportResponse updateReport(int reportId) {

        Report report = reportRepository.findById(reportId)
                .orElseThrow(() -> new RuntimeException("Report not found"));
        report.setStatus(true);

        reportRepository.save(report);

        return reportMapper.toReportResponse(report);
    }

    @Override
    public void deleteReport(int reportId) {
        reportRepository.deleteById(reportId);
    }
}
