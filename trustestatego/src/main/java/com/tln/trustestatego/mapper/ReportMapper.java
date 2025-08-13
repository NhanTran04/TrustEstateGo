package com.tln.trustestatego.mapper;

import com.tln.trustestatego.dto.request.ReportUserRequest;
import com.tln.trustestatego.dto.response.ReportResponse;
import com.tln.trustestatego.entity.Report;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface ReportMapper {
    Report toReport(ReportUserRequest reportUserRequest);
    @Mapping(source = "user.id", target = "userId")
    @Mapping(source = "property.id", target = "propertyId")
    @Mapping(source = "property.title", target = "propertyTitle")
    @Mapping(target = "propertyImage",
        expression = "java(report.getProperty().getPropertyImages().isEmpty() ? null " +
                ": report.getProperty().getPropertyImages().iterator().next().getImageUrl())"
    )
    ReportResponse toReportResponse(Report report);
}
