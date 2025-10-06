package com.tln.trustestatego.mapper;

import com.tln.trustestatego.dto.request.ReportUserRequest;
import com.tln.trustestatego.dto.request.RoleRequest;
import com.tln.trustestatego.dto.response.ReportResponse;
import com.tln.trustestatego.entity.Report;
import com.tln.trustestatego.entity.Role;
import org.mapstruct.*;

@Mapper(componentModel = "spring", nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface ReportMapper {
    Report toReport(ReportUserRequest reportUserRequest);
    @Mapping(source = "user.id", target = "userId")
    @Mapping(target = "name", expression = "java(report.getUser().getFirstName() + \" \" + report.getUser().getLastName())")
    @Mapping(source = "property.id", target = "propertyId")
    @Mapping(source = "property.title", target = "propertyTitle")
    @Mapping(target = "propertyImage",
        expression = "java(report.getProperty().getPropertyImages().isEmpty() ? null " +
                ": report.getProperty().getPropertyImages().iterator().next().getImageUrl())"
    )
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    ReportResponse toReportResponse(Report report);
}
