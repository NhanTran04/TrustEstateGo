package com.tln.trustestatego.controller.user;

import com.tln.trustestatego.dto.request.PropertyRequest;
import com.tln.trustestatego.dto.response.ApiResponse;
import com.tln.trustestatego.dto.response.PageResponse;
import com.tln.trustestatego.dto.response.PropertyResponse;
import com.tln.trustestatego.dto.response.PropertyTypeResponse;
import com.tln.trustestatego.service.PropertyService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

@RequestMapping("/api")
@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class PropertyController {
    PropertyService propertyService;

    @GetMapping("/properties")
    public ResponseEntity<ApiResponse<PageResponse<PropertyResponse>>> getProperties(@RequestParam(required = false) Integer categoryId,Pageable pageable) {
        try {
                return ResponseEntity.ok(
                        ApiResponse.<PageResponse<PropertyResponse>>builder()
                                .result(propertyService.getProperties(categoryId, pageable))
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

    @GetMapping("/property-types")
    public ResponseEntity<ApiResponse<List<PropertyTypeResponse>>> getPropertyTypes() {
        try {
            return ResponseEntity.ok(
                    ApiResponse.<List<PropertyTypeResponse>>builder()
                            .result(propertyService.getAllPropertyTypes())
                            .build()
            );
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ApiResponse.<List<PropertyTypeResponse>>builder()
                            .code(HttpStatus.INTERNAL_SERVER_ERROR.value())
                            .message(e.getMessage())
                            .build());
        }
    }

    @PreAuthorize("hasRole('SELLER')")
    @GetMapping("/seller-properties")
    public ResponseEntity<ApiResponse<PageResponse<PropertyResponse>>> getPropertyByUserId(Pageable pageable) {
        try {
            return ResponseEntity.ok(
                    ApiResponse.<PageResponse<PropertyResponse>>builder()
                            .result(propertyService.getPropertyByUserId(pageable))
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

    @PreAuthorize("hasRole('SELLER')")
    @GetMapping("/properties/allow-post")
    public ResponseEntity<ApiResponse<Boolean>> allowPost() {
        try {
            return ResponseEntity.ok(
                    ApiResponse.<Boolean>builder()
                            .result(propertyService.allowPost())
                            .build()
            );
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ApiResponse.<Boolean>builder()
                            .code(HttpStatus.INTERNAL_SERVER_ERROR.value())
                            .message(e.getMessage())
                            .build());
        }
    }

//    @GetMapping("/users/{sellerId}/properties")
//    public ResponseEntity<ApiResponse<PageResponse<PropertyResponse>>> getPropertyBySellerId(
//            @PathVariable("sellerId") int sellerId, Pageable pageable) {
//        try {
//            // dùng sellerId từ path chứ không dùng currentUser
//            PageResponse<PropertyResponse> result = propertyService.getPropertyBySellerId(sellerId, pageable);
//            return ResponseEntity.ok(
//                    ApiResponse.<PageResponse<PropertyResponse>>builder()
//                            .result(result)
//                            .build()
//            );
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
//                    .body(ApiResponse.<PageResponse<PropertyResponse>>builder()
//                            .code(HttpStatus.INTERNAL_SERVER_ERROR.value())
//                            .message(e.getMessage())
//                            .build());
//        }
//    }

    @GetMapping("/properties/{propertyId}")
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

    @PreAuthorize("hasRole('SELLER')")
    @PostMapping(path = "/properties")
    public ResponseEntity<ApiResponse<PropertyResponse>> createProperty(@RequestBody PropertyRequest propertyRequest) {
        try {
            System.out.println("📥 PropertyRequest nhận được: " + propertyRequest);
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(ApiResponse.<PropertyResponse>builder()
                            .result(propertyService.createProperty(propertyRequest))
                            .build());
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(ApiResponse.<PropertyResponse>builder()
                            .code(HttpStatus.BAD_REQUEST.value())
                            .message(e.getMessage())
                            .build());
        }
    }

    @PreAuthorize("hasRole('SELLER')")
    @PutMapping(path = "/properties/{propertyId}")
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

    @PreAuthorize("hasRole('SELLER')")
    @PostMapping(path = "/properties/{propertyId}/images", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ApiResponse<List<String>>> uploadImages(
            @PathVariable int propertyId,
            @RequestParam("images") MultipartFile[] images) {

        List<String> uploadedUrls = propertyService.uploadPropertyImages(propertyId, images);

        return ResponseEntity.ok(ApiResponse.<List<String>>builder()
                .result(uploadedUrls)
                .build());
    }

    @GetMapping("/properties/search")
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

    @PreAuthorize("hasRole('SELLER')")
    @DeleteMapping("/properties/{propertyId}")
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
