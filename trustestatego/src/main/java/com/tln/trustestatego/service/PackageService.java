package com.tln.trustestatego.service;

import com.tln.trustestatego.dto.request.PackageRequest;
import com.tln.trustestatego.dto.response.PackageResponse;

import java.util.List;

public interface PackageService {
    public List<PackageResponse> getPackages();
    public PackageResponse createPackage(PackageRequest packageRequest);
    public PackageResponse updatePackage(int packId, PackageRequest packageRequest);
    public void deletePackage(int packId);
}
