package com.tln.trustestatego.service;

import com.tln.trustestatego.dto.request.PackageRequest;
import com.tln.trustestatego.dto.response.PackageResponse;

import java.util.List;

public interface PackageService {
    List<PackageResponse> getPackages();
    PackageResponse getPackageById(int packageId);
    PackageResponse createPackage(PackageRequest packageRequest);
    PackageResponse updatePackage(int packId, PackageRequest packageRequest);
    void deletePackage(int packId);
}
