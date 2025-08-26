package com.tln.trustestatego.controller.user;

import com.tln.trustestatego.dto.request.CategoryRequest;
import com.tln.trustestatego.dto.response.ApiResponse;
import com.tln.trustestatego.dto.response.CategoryResponse;
import com.tln.trustestatego.service.CategoryService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/api/categories")
@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class CategoryController {
    CategoryService categoryService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<CategoryResponse>>> getCategories() {
        try {
            return ResponseEntity.ok(
                    ApiResponse.<List<CategoryResponse>>builder()
                            .result(categoryService.getCategories())
                            .build()
            );
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                    ApiResponse.<List<CategoryResponse>>builder()
                            .code(HttpStatus.INTERNAL_SERVER_ERROR.value())
                            .message(e.getMessage())
                            .build()
            );
        }
    }

    @PostMapping
    public ResponseEntity<ApiResponse<CategoryResponse>> createCategory(@RequestBody CategoryRequest categoryRequest) {
        try {
            return ResponseEntity.status(HttpStatus.CREATED).body(
                    ApiResponse.<CategoryResponse>builder()
                            .result(categoryService.createCategory(categoryRequest))
                            .build()
            );
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                    ApiResponse.<CategoryResponse>builder()
                            .code(HttpStatus.BAD_REQUEST.value())
                            .message(e.getMessage())
                            .build()
            );
        }
    }

    @PutMapping("/{cateId}")
    public ResponseEntity<ApiResponse<CategoryResponse>> updateCategory(
            @PathVariable int cateId,
            @RequestBody CategoryRequest categoryRequest) {
        try {
            return ResponseEntity.ok(
                    ApiResponse.<CategoryResponse>builder()
                            .result(categoryService.updateCategory(cateId, categoryRequest))
                            .build()
            );
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                    ApiResponse.<CategoryResponse>builder()
                            .code(HttpStatus.BAD_REQUEST.value())
                            .message(e.getMessage())
                            .build()
            );
        }
    }

    @DeleteMapping("/{cateId}")
    public ResponseEntity<ApiResponse<Void>> deleteCategory(@PathVariable int cateId) {
        try {
            categoryService.deleteCategory(cateId);
            return ResponseEntity.ok(
                    ApiResponse.<Void>builder()
                            .message("Xóa category thành công")
                            .build()
            );
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                    ApiResponse.<Void>builder()
                            .code(HttpStatus.BAD_REQUEST.value())
                            .message(e.getMessage())
                            .build()
            );
        }
    }
}
