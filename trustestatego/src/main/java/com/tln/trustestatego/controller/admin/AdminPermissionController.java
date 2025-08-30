package com.tln.trustestatego.controller.admin;

import com.tln.trustestatego.dto.request.PermissionRequest;
import com.tln.trustestatego.dto.response.ApiResponse;
import com.tln.trustestatego.dto.response.PermissionResponse;
import com.tln.trustestatego.service.PermissionService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/api/admin/permissions")
@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AdminPermissionController {
    PermissionService permissionService;

    @GetMapping
    public ResponseEntity<List<PermissionResponse>> getPermissions() {
        List<PermissionResponse> permissions = permissionService.getPermissions();

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Range", "permissions 0-" + (permissions.size() - 1) + "/" + permissions.size());
        headers.add("Access-Control-Expose-Headers", "Content-Range");

        return new ResponseEntity<>(permissions, headers, HttpStatus.OK);
    }

    @GetMapping("/{permissionId}")
    public ResponseEntity<PermissionResponse> getPermissionById(@PathVariable int permissionId) {
        PermissionResponse permission = permissionService.getPermissionById(permissionId);
        return ResponseEntity.ok(permission);
    }

    @PostMapping
    public ResponseEntity<PermissionResponse> createPermission(@RequestBody PermissionRequest request) {
        PermissionResponse created = permissionService.createPermission(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @PutMapping("/{permissionId}")
    public ResponseEntity<PermissionResponse> updatePermission(
            @PathVariable int permissionId,
            @RequestBody PermissionRequest request) {
        PermissionResponse updated = permissionService.updatePermission(permissionId, request);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{permissionId}")
    public ResponseEntity<Void> deletePermission(@PathVariable int permissionId) {
        permissionService.deletePermission(permissionId);
        return ResponseEntity.noContent().build();
    }
}
