package com.tln.trustestatego.mapper;

import com.tln.trustestatego.dto.request.CategoryRequest;
import com.tln.trustestatego.dto.request.PackageRequest;
import com.tln.trustestatego.dto.response.CategoryResponse;
import com.tln.trustestatego.dto.response.PackageResponse;
import com.tln.trustestatego.entity.Category;
import com.tln.trustestatego.entity.Package;
import org.mapstruct.*;

@Mapper(componentModel = "spring")
public interface PackageMapper {
    PackageResponse toPackageResponse(Package pack);
    Package toPackage(PackageRequest packageRequest);
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void update(@MappingTarget Package pack, PackageRequest packageRequest);
}
