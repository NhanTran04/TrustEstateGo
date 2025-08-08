package com.tln.trustestatego.controller;

import com.tln.trustestatego.dto.request.PackageRequest;
import com.tln.trustestatego.dto.response.ApiResponse;
import com.tln.trustestatego.dto.response.PackageResponse;
import com.tln.trustestatego.entity.Package;
import com.tln.trustestatego.repository.PackageRepository;
import com.tln.trustestatego.service.PackageService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/packages")
@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class PackageController {
     PackageService packageService;

    @GetMapping
    ApiResponse<List<PackageResponse>> getPackages(){
        return ApiResponse.<List<PackageResponse>>builder()
                .result(packageService.getPackages())
                .build();
    }

    @PostMapping
    ApiResponse<PackageResponse> createPackage(@RequestBody PackageRequest packageRequest){
        return ApiResponse.<PackageResponse>builder()
                .result(packageService.createPackage(packageRequest))
                .build();
    }

    @PutMapping("/{packageId}")
    ApiResponse<PackageResponse> updatePackage(@PathVariable int packageId, @RequestBody PackageRequest packageRequest){
        return ApiResponse.<PackageResponse>builder()
                .result(packageService.updatePackage(packageId, packageRequest))
                .build();
    }

    @DeleteMapping("/{packageId}")
    void deletePackage(@PathVariable int packageId){
        packageService.deletePackage(packageId);
    }

}
