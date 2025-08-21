package com.tln.trustestatego.controller;

import com.tln.trustestatego.dto.request.PropertyRequest;
import com.tln.trustestatego.dto.response.ApiResponse;
import com.tln.trustestatego.dto.response.PropertyResponse;
import com.tln.trustestatego.service.PropertyService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/properties")
@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class PropertyController {
    PropertyService propertyService;

    @GetMapping
    public ResponseEntity<ApiResponse<Page<PropertyResponse>>> getProperties(Pageable pageable) {
        try {
                return ResponseEntity.ok(
                        ApiResponse.<Page<PropertyResponse>>builder()
                                .result(propertyService.getProperties(pageable))
                                .build()
                );
            } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .body(ApiResponse.<Page<PropertyResponse>>builder()
                                .code(HttpStatus.INTERNAL_SERVER_ERROR.value())
                                .message(e.getMessage())
                                .build());
        }
    }

    @GetMapping("/{propertyId}")
    public ResponseEntity<ApiResponse<PropertyResponse>> getPropertyById(@PathVariable int propertyId) {
        try {
            return ResponseEntity.ok(
                    ApiResponse.<PropertyResponse>builder()
                            .result(propertyService.getPropertyById(propertyId))
                            .build()
            );
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ApiResponse.<PropertyResponse>builder()
                            .code(HttpStatus.INTERNAL_SERVER_ERROR.value())
                            .message(e.getMessage())
                            .build());
        }
    }

    @PostMapping
    public ResponseEntity<ApiResponse<PropertyResponse>> createProperty(@RequestBody PropertyRequest propertyRequest) {
        try {
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(ApiResponse.<PropertyResponse>builder()
                            .result(propertyService.createProperty(propertyRequest))
                            .build());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(ApiResponse.<PropertyResponse>builder()
                            .code(HttpStatus.BAD_REQUEST.value())
                            .message(e.getMessage())
                            .build());
        }
    }

    @PutMapping("/{propertyId}")
    public ResponseEntity<ApiResponse<PropertyResponse>> updateProperty(
            @PathVariable int propertyId,
            @RequestBody PropertyRequest propertyRequest) {
        try {
            return ResponseEntity.ok(
                    ApiResponse.<PropertyResponse>builder()
                            .result(propertyService.updateProperty(propertyId, propertyRequest))
                            .build());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(ApiResponse.<PropertyResponse>builder()
                            .code(HttpStatus.BAD_REQUEST.value())
                            .message(e.getMessage())
                            .build());
        }
    }

    @DeleteMapping("/{propertyId}")
    public ResponseEntity<ApiResponse<Void>> deleteProperty(@PathVariable int propertyId) {
        try {
            propertyService.deleteProperty(propertyId);
            return ResponseEntity.ok(
                    ApiResponse.<Void>builder()
                            .message("Xóa bất động sản thành công")
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
