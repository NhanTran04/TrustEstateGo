package com.tln.trustestatego.controller;

import com.tln.trustestatego.dto.request.PackageRequest;
import com.tln.trustestatego.dto.response.ApiResponse;
import com.tln.trustestatego.dto.response.PackageResponse;
import com.tln.trustestatego.service.PackageService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/packages")
@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class PackageController {
     PackageService packageService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<PackageResponse>>> getPackages(){
        try{
        return ResponseEntity.ok(
                ApiResponse.<List<PackageResponse>>builder()
                        .result(packageService.getPackages())
                        .build()
        );
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ApiResponse.<List<PackageResponse>>builder()
                            .code(HttpStatus.BAD_REQUEST.value())
                            .message(e.getMessage())
                            .build());
        }

    }

    @PostMapping
    public ResponseEntity<ApiResponse<PackageResponse>> createPackage(@RequestBody PackageRequest packageRequest) {
        try {
            PackageResponse createdPackage = packageService.createPackage(packageRequest);
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(ApiResponse.<PackageResponse>builder()
                            .result(createdPackage)
                            .message("Package created successfully")
                            .build());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    @PutMapping("/{packageId}")
    public ResponseEntity<ApiResponse<PackageResponse>> updatePackage(
            @PathVariable int packageId,
            @RequestBody PackageRequest packageRequest) {
        try {
            PackageResponse updatedPackage = packageService.updatePackage(packageId, packageRequest);
            return ResponseEntity.ok(
                    ApiResponse.<PackageResponse>builder()
                            .result(updatedPackage)
                            .message("Package updated successfully")
                            .build());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(ApiResponse.<PackageResponse>builder()
                            .message("Failed to update package: " + e.getMessage())
                            .build());
        }
    }

    @DeleteMapping("/{packageId}")
    public ResponseEntity<ApiResponse<Void>> deletePackage(@PathVariable int packageId) {
        try {
            packageService.deletePackage(packageId);
            return ResponseEntity.ok(
                    ApiResponse.<Void>builder()
                            .message("Package deleted successfully")
                            .build());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(ApiResponse.<Void>builder()
                            .message("Failed to delete package: " + e.getMessage())
                            .build());
        }
    }

}
