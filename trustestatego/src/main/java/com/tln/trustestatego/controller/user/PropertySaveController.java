package com.tln.trustestatego.controller.user;

import com.tln.trustestatego.dto.response.ApiResponse;
import com.tln.trustestatego.dto.response.PropertySaveResponse;
import com.tln.trustestatego.service.PropertySaveService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/property_save")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class PropertySaveController {
    PropertySaveService proSaveService;

    @GetMapping("/users/{userId}")
    ResponseEntity<ApiResponse<List<PropertySaveResponse>>> getPropertySaves(@PathVariable int userId){
        try{
//            int userId = getCurrentUserIdFromSecurityContext ();
            return ResponseEntity
                    .ok(ApiResponse.<List<PropertySaveResponse>>builder()
                            .result(proSaveService.getPropertyByUserId(userId))
                    .build());

        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ApiResponse.<List<PropertySaveResponse>>builder()
                            .code(HttpStatus.INTERNAL_SERVER_ERROR.value())
                            .message(e.getMessage())
                            .build());
        }
    }

    @PostMapping("/{propertyId}/users/{userId}")
    ResponseEntity<ApiResponse<Void>> createPropertySave(@PathVariable(value = "propertyId") int propertyId, @PathVariable(value = "userId") int userId) {
        try {
            proSaveService.togglePropertySave(userId, propertyId);
            return ResponseEntity.status(HttpStatus.CREATED).body(
                    ApiResponse.<Void>builder()
                            .result(null) // vì không có dữ liệu trả về
                            .build()
            );
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(ApiResponse.<Void>builder()
                            .code(HttpStatus.BAD_REQUEST.value())
                            .message(e.getMessage())
                            .build());
        }
    }

//    @DeleteMapping("/{proSaveId}")
//    ResponseEntity<ApiResponse<Void>> deletePropertySaves(@PathVariable int proSaveId) {
//        try {
//            proSaveService.deleteById(proSaveId);
//            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(
//                    ApiResponse.<Void>builder()
//                            .result(null) // vì không có dữ liệu trả về
//                            .build()
//            );
//        } catch (RuntimeException e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
//                    .body(ApiResponse.<Void>builder()
//                            .code(HttpStatus.INTERNAL_SERVER_ERROR.value())
//                            .message(e.getMessage())
//                            .build());
//        }
//    }

}
