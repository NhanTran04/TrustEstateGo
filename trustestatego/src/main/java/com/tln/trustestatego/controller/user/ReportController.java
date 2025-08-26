package com.tln.trustestatego.controller.user;

import com.tln.trustestatego.dto.request.ReportUserRequest;
import com.tln.trustestatego.dto.response.ApiResponse;
import com.tln.trustestatego.dto.response.PageResponse;
import com.tln.trustestatego.dto.response.ReportResponse;
import com.tln.trustestatego.service.ReportService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/api/reports")
@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ReportController {
    ReportService reportService;

    @GetMapping
    public ResponseEntity<ApiResponse<PageResponse<ReportResponse>>> getReports(@RequestParam(defaultValue = "") String kw
            , Pageable pageable){
        try{
            return ResponseEntity.ok()
                    .body(ApiResponse.<PageResponse<ReportResponse>>builder()
                            .result(reportService.getReports(kw, pageable))
                            .build());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ApiResponse.<PageResponse<ReportResponse>>builder()
                            .code(HttpStatus.INTERNAL_SERVER_ERROR.value())
                            .message(e.getMessage())
                            .build());
        }
    }

    @GetMapping("/users/{userId}")
    public ResponseEntity<ApiResponse<PageResponse<ReportResponse>>> getReportByUserId(@PathVariable int userId, Pageable pageable){
        try{
            return ResponseEntity.ok()
                    .body(ApiResponse.<PageResponse<ReportResponse>>builder()
                            .result(reportService.getReportByUserId(userId, pageable))
                            .build());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ApiResponse.<PageResponse<ReportResponse>>builder()
                            .code(HttpStatus.INTERNAL_SERVER_ERROR.value())
                            .message(e.getMessage())
                            .build());
        }
    }

    @PostMapping("/{propertyId}/users/{userId}")
    public ResponseEntity<ApiResponse<ReportResponse>> createReport(
            @RequestBody ReportUserRequest reportUserRequest,
            @PathVariable(value = "propertyId") int propertyId,
            @PathVariable(value = "userId") int userId){
        try{
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(ApiResponse.<ReportResponse>builder()
                            .result(reportService.createReport(reportUserRequest, userId, propertyId))
                            .build());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(ApiResponse.<ReportResponse>builder()
                            .code(HttpStatus.BAD_REQUEST.value())
                            .message(e.getMessage())
                            .build());
        }
    }

    @PutMapping("/{reportId}")
    public ResponseEntity<ApiResponse<ReportResponse>> updateReport(@PathVariable int reportId){
        try{
            return ResponseEntity.ok()
                    .body(ApiResponse.<ReportResponse>builder()
                            .result(reportService.updateReport(reportId))
                            .build());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(ApiResponse.<ReportResponse>builder()
                            .code(HttpStatus.BAD_REQUEST.value())
                            .message(e.getMessage())
                            .build());
        }
    }

    @DeleteMapping("/{reportId}")
    public ResponseEntity<ApiResponse<Void>> deleteReport(@PathVariable int reportId){
        try{
            reportService.deleteReport(reportId);
            return ResponseEntity.status(HttpStatus.NO_CONTENT)
                    .body(ApiResponse.<Void>builder()
                            .result(null)
                            .build());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ApiResponse.<Void>builder()
                            .code(HttpStatus.INTERNAL_SERVER_ERROR.value())
                            .message(e.getMessage())
                            .build());
        }
    }

}
