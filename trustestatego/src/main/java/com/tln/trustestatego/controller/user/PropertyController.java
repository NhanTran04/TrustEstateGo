package com.tln.trustestatego.controller.user;

import com.tln.trustestatego.dto.request.PropertyRequest;
import com.tln.trustestatego.dto.response.ApiResponse;
import com.tln.trustestatego.dto.response.PageResponse;
import com.tln.trustestatego.dto.response.PropertyResponse;
import com.tln.trustestatego.service.PropertyService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RequestMapping("/api/properties")
@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class PropertyController {
    PropertyService propertyService;

    @GetMapping
    public ResponseEntity<ApiResponse<PageResponse<PropertyResponse>>> getProperties(Pageable pageable) {
        try {
                return ResponseEntity.ok(
                        ApiResponse.<PageResponse<PropertyResponse>>builder()
                                .result(propertyService.getProperties(pageable))
                                .build()
                );
            } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .body(ApiResponse.<PageResponse<PropertyResponse>>builder()
                                .code(HttpStatus.INTERNAL_SERVER_ERROR.value())
                                .message(e.getMessage())
                                .build());
        }
    }

    @GetMapping("/users/{userId}")
    public ResponseEntity<ApiResponse<PageResponse<PropertyResponse>>> getPropertyByUserId(@PathVariable int userId, Pageable pageable) {
        try {
            return ResponseEntity.ok(
                    ApiResponse.<PageResponse<PropertyResponse>>builder()
                            .result(propertyService.getPropertyByUserId(userId,pageable))
                            .build()
            );
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ApiResponse.<PageResponse<PropertyResponse>>builder()
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

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ApiResponse<PropertyResponse>> createProperty(@ModelAttribute PropertyRequest propertyRequest) {
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

    @PutMapping(path = "/{propertyId}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ApiResponse<PropertyResponse>> updateProperty(
            @PathVariable int propertyId,
            @ModelAttribute PropertyRequest propertyRequest) {
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

    @GetMapping("/search")
    public ResponseEntity<ApiResponse<PageResponse<?>>> searchProperties(
            @RequestParam Map<String, String> params,
            Pageable pageable
    ) {
        try {
            return ResponseEntity.ok(
                    ApiResponse.<PageResponse<?>>builder()
                            .result(propertyService.searchProperty(params, pageable))
                            .build()
            );
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(ApiResponse.<PageResponse<?>>builder()
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
