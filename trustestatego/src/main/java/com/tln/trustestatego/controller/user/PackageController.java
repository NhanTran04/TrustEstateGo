package com.tln.trustestatego.controller.user;

import com.tln.trustestatego.dto.request.PackageRequest;
import com.tln.trustestatego.dto.response.ApiResponse;
import com.tln.trustestatego.dto.response.PackageResponse;
import com.tln.trustestatego.service.PackageService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/api/packages")
@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class PackageController {
     PackageService packageService;
    @PreAuthorize("hasRole('SELLER')")
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
    @PreAuthorize("hasRole('SELLER')")
    @GetMapping("/{packageId}")
    public ResponseEntity<ApiResponse<PackageResponse>> getPackageById(@PathVariable int packId){
        try{
            return ResponseEntity.ok(
                    ApiResponse.<PackageResponse>builder()
                            .result(packageService.getPackageById(packId))
                            .build()
            );
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ApiResponse.<PackageResponse>builder()
                            .code(HttpStatus.BAD_REQUEST.value())
                            .message(e.getMessage())
                            .build());
        }

    }


}
