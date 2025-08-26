package com.tln.trustestatego.controller.admin;

import com.tln.trustestatego.dto.request.RoleRequest;
import com.tln.trustestatego.dto.response.ApiResponse;
import com.tln.trustestatego.dto.response.PageResponse;
import com.tln.trustestatego.dto.response.RoleResponse;
import com.tln.trustestatego.service.RoleService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/api/admin/roles")
@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class RoleController {
    RoleService roleService;

    @GetMapping
    public ResponseEntity<ApiResponse<PageResponse<RoleResponse>>> getRoles(@RequestParam(defaultValue = "") String kw
            , Pageable pageable){
        try{
            return ResponseEntity.ok()
                    .body(ApiResponse.<PageResponse<RoleResponse>>builder()
                            .result(roleService.getRoles(pageable))
                            .build());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ApiResponse.<PageResponse<RoleResponse>>builder()
                            .code(HttpStatus.INTERNAL_SERVER_ERROR.value())
                            .message(e.getMessage())
                            .build());
        }
    }

    @PostMapping
    public ResponseEntity<ApiResponse<RoleResponse>> createRole(@RequestBody RoleRequest roleRequest){
        try{
            return ResponseEntity.ok()
                    .body(ApiResponse.<RoleResponse>builder()
                            .result(roleService.createRole(roleRequest))
                            .build());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(ApiResponse.<RoleResponse>builder()
                            .code(HttpStatus.BAD_REQUEST.value())
                            .message(e.getMessage())
                            .build());
        }
    }

    @PutMapping("/{roleId}")
    public ResponseEntity<ApiResponse<RoleResponse>> updateRole(@PathVariable int roleId, @RequestBody RoleRequest roleRequest){
        try{
            return ResponseEntity.ok()
                    .body(ApiResponse.<RoleResponse>builder()
                            .result(roleService.updateRole(roleId, roleRequest))
                            .build());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ApiResponse.<RoleResponse>builder()
                            .code(HttpStatus.INTERNAL_SERVER_ERROR.value())
                            .message(e.getMessage())
                            .build());
        }
    }

    @DeleteMapping("/{roleId}")
    public ResponseEntity<ApiResponse<Void>> deleteRole(@PathVariable int roleId){
        try{
            roleService.deleteRole(roleId);
            return ResponseEntity.ok()
                    .body(ApiResponse.<Void>builder()
                            .result(null)
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
