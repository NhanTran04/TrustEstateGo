package com.tln.trustestatego.mapper;

import com.tln.trustestatego.dto.request.ReportUserRequest;
import com.tln.trustestatego.dto.response.ReportResponse;
import com.tln.trustestatego.entity.Report;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ReportMapper {
    Report toReport(ReportUserRequest reportUserRequest);
    ReportResponse toReportResponse(Report report);
}
