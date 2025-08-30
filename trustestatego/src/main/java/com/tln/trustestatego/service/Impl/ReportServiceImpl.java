package com.tln.trustestatego.service.Impl;

import com.tln.trustestatego.dto.request.ReportUserRequest;
import com.tln.trustestatego.dto.response.PageResponse;
import com.tln.trustestatego.dto.response.ReportResponse;
import com.tln.trustestatego.entity.Report;
import com.tln.trustestatego.mapper.PageMapper;
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
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

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
    PageMapper pageMapper;

    @Override
    public PageResponse<ReportResponse> getReports(String keyword, Pageable pageable) {
        Pageable sortPage = PageRequest.of(
                pageable.getPageNumber(),
                pageable.getPageSize(),
                Sort.by(Sort.Direction.DESC, "createdAt")
        );
        if(keyword != null && !keyword.isEmpty()) {
            Page<ReportResponse> reportPage = reportRepository.findByProperty_TitleContainingIgnoreCase(keyword, sortPage)
                    .map(reportMapper::toReportResponse);
        }
        Page<ReportResponse> reportPage = reportRepository.findAll(sortPage)
                .map(reportMapper::toReportResponse);
        return pageMapper.toPageResponse(reportPage);
    }

    @Override
    public PageResponse<ReportResponse> getReportByUserId(int userId, Pageable pageable) {
        Page<ReportResponse> reportPage = reportRepository.findByUser_Id(userId, pageable).map(reportMapper::toReportResponse);
        return pageMapper.toPageResponse(reportPage);
    }

    @Override
    public ReportResponse createReport(ReportUserRequest reportUserRequest, int userId, int propertyId) {
        boolean exists = reportRepository.existsByUserIdAndPropertyId(
                userId, propertyId);
        if (exists) {
            throw new IllegalStateException("You reported this property");
        }

        Report report = reportMapper.toReport(reportUserRequest);

        report.setUser(userRepository.findById(userId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found")));
        report.setProperty(propertyRepository.findById(propertyId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Property not found")));
        report.setCreatedAt(LocalDateTime.now());

        reportRepository.save(report);

        return reportMapper.toReportResponse(report);
    }

    @Override
    public ReportResponse updateReport(int reportId) {

        Report report = reportRepository.findById(reportId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Report not found"));
        report.setStatus(true);

        reportRepository.save(report);

        return reportMapper.toReportResponse(report);
    }

    @Override
    public void deleteReport(int reportId) {
        reportRepository.deleteById(reportId);
    }
}
