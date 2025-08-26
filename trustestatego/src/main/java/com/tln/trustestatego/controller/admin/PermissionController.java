package com.tln.trustestatego.controller.admin;

import com.tln.trustestatego.dto.request.PermissionRequest;
import com.tln.trustestatego.dto.response.ApiResponse;
import com.tln.trustestatego.dto.response.PermissionResponse;
import com.tln.trustestatego.service.PermissionService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/api/admin/permissions")
@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class PermissionController {
    PermissionService permissionService;

    @PostMapping
    ResponseEntity<ApiResponse<PermissionResponse>> create(@RequestBody PermissionRequest request){
        try {
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(ApiResponse.<PermissionResponse>builder()
                            .result(permissionService.createPermission(request))
                            .build());

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(ApiResponse.<PermissionResponse>builder()
                            .code(HttpStatus.BAD_REQUEST.value())
                            .message(e.getMessage())
                            .build());

        }
    }

    @GetMapping
    ResponseEntity<ApiResponse<List<PermissionResponse>>> getPermissions(){
        try {
            return ResponseEntity.status(HttpStatus.OK)
                    .body(ApiResponse.<List<PermissionResponse>>builder()
                            .result(permissionService.getPermissions())
                            .build());
        }catch (Exception e) {
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(ApiResponse.<List<PermissionResponse>>builder()
                            .code(HttpStatus.INTERNAL_SERVER_ERROR.value())
                            .message(e.getMessage())
                            .build());
        }
    }

    @DeleteMapping("/{permissionId}")
    ResponseEntity<ApiResponse<Void>> delete(@PathVariable int permissionId){
        try{
            permissionService.deletePermission(permissionId);
            return ResponseEntity.status(HttpStatus.NO_CONTENT)
                    .body(ApiResponse.<Void>builder()
                            .result(null).build());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(ApiResponse.<Void>builder()
                            .code(HttpStatus.BAD_REQUEST.value())
                            .message(e.getMessage())
                            .build());
        }
    }


}
