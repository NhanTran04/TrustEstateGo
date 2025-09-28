package com.tln.trustestatego.controller.admin;

import com.tln.trustestatego.dto.response.PageResponse;
import com.tln.trustestatego.dto.response.ReportResponse;
import com.tln.trustestatego.service.ReportService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/api/staff/reports")
@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AdminReportController {
    ReportService reportService;

    @GetMapping
    public ResponseEntity<List<ReportResponse>> getReports(
            @RequestParam(required = false) String keyword,
            Pageable pageable
    ) {
        PageResponse<ReportResponse> reports = reportService.getReports(keyword, pageable);

        int start = pageable.getPageNumber() * pageable.getPageSize();
        int end = start + reports.getContent().size() - 1;

        // Nếu không có phần tử nào thì Content-Range phải trả "0-0/0"
        if (reports.getContent().isEmpty()) {
            return ResponseEntity
                    .ok()
                    .header("Content-Range", "reports 0-0/0")
                    .body(reports.getContent());
        }

        return ResponseEntity
                .ok()
                .header("Content-Range",
                        String.format("reports %d-%d/%d", start, end, reports.getTotalElements()))
                .body(reports.getContent());
    }

    @GetMapping("/{id}")
    public ReportResponse getReport(@PathVariable int id) {
        return reportService.getReport(id);
    }

    @PutMapping("/{id}")
    public ReportResponse updateReport(@PathVariable int id) {
        return reportService.updateReport(id);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteReport(@PathVariable int id) {
        reportService.deleteReport(id);
        return ResponseEntity.noContent().build();
    }
}
