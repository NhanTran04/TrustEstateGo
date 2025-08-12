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
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

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
    public List<ReportResponse> getReports() {
        return reportRepository.findAll(Sort.by(Sort.Direction.DESC, "createdAt"))
                .stream()
                .map(reportMapper::toReportResponse)
                .collect(Collectors.toList());
    }

    @Override
    public ReportResponse createReport(ReportUserRequest reportUserRequest) {
        boolean exists = reportRepository.existsByUserIdAndPostId(
                reportUserRequest.getUserId(), reportUserRequest.getPropertyId());
        if (exists) {
            throw new IllegalStateException("Bạn đã report bài này rồi");
        }

        Report report = new Report();
        report.setUser(userRepository.findById(reportUserRequest.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found")));
        report.setProperty(propertyRepository.findById(reportUserRequest.getPropertyId())
                .orElseThrow(() -> new RuntimeException("Property not found")));
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
