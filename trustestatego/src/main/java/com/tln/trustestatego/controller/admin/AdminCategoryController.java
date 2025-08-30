package com.tln.trustestatego.controller.admin;

import com.tln.trustestatego.dto.request.CategoryRequest;
import com.tln.trustestatego.dto.response.CategoryResponse;
import com.tln.trustestatego.service.CategoryService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RequestMapping("/api/admin/categories")
@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AdminCategoryController {
    CategoryService categoryService;


    @GetMapping
    public ResponseEntity<List<CategoryResponse>> getCategories() {
        List<CategoryResponse> categories = categoryService.getCategories();

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Range", "categories 0-" + (categories.size() - 1) + "/" + categories.size());
        headers.add("Access-Control-Expose-Headers", "Content-Range");

        return new ResponseEntity<>(categories, headers, HttpStatus.OK);
    }

    @GetMapping("/{cateId}")
    public ResponseEntity<CategoryResponse> getCategoryById(@PathVariable int cateId) {
        CategoryResponse category = categoryService.getCategoryById(cateId);
        return ResponseEntity.status(HttpStatus.OK).body(category);
    }

    @PostMapping
    public ResponseEntity<CategoryResponse> createCategory(@RequestBody CategoryRequest categoryRequest) {
        CategoryResponse category = categoryService.createCategory(categoryRequest);
        return ResponseEntity.status(HttpStatus.CREATED).body(category);
    }

    @PutMapping("/{cateId}")
    public ResponseEntity<CategoryResponse> updateCategory(
            @PathVariable int cateId,
            @RequestBody CategoryRequest categoryRequest) {
        CategoryResponse category = categoryService.updateCategory(cateId, categoryRequest);
        return ResponseEntity.ok(category);
    }

    @DeleteMapping("/{cateId}")
    public ResponseEntity<Void> deleteCategory(@PathVariable int cateId) {
        categoryService.deleteCategory(cateId);
        return ResponseEntity.ok().build();
    }

    //    @GetMapping
//    public ResponseEntity<ApiResponse<List<CategoryResponse>>> getCategories() {
//        try {
//            return ResponseEntity.ok(
//                    ApiResponse.<List<CategoryResponse>>builder()
//                            .result(categoryService.getCategories())
//                            .build()
//            );
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
//                    ApiResponse.<List<CategoryResponse>>builder()
//                            .code(HttpStatus.INTERNAL_SERVER_ERROR.value())
//                            .message(e.getMessage())
//                            .build()
//            );
//        }
//    }

//    @PostMapping
//    public ResponseEntity<ApiResponse<CategoryResponse>> createCategory(@RequestBody CategoryRequest categoryRequest) {
//        try {
//            return ResponseEntity.status(HttpStatus.CREATED).body(
//                    ApiResponse.<CategoryResponse>builder()
//                            .result(categoryService.createCategory(categoryRequest))
//                            .build()
//            );
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
//                    ApiResponse.<CategoryResponse>builder()
//                            .code(HttpStatus.BAD_REQUEST.value())
//                            .message(e.getMessage())
//                            .build()
//            );
//        }
//    }
//
//    @PutMapping("/{cateId}")
//    public ResponseEntity<ApiResponse<CategoryResponse>> updateCategory(
//            @PathVariable int cateId,
//            @RequestBody CategoryRequest categoryRequest) {
//        try {
//            return ResponseEntity.ok(
//                    ApiResponse.<CategoryResponse>builder()
//                            .result(categoryService.updateCategory(cateId, categoryRequest))
//                            .build()
//            );
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
//                    ApiResponse.<CategoryResponse>builder()
//                            .code(HttpStatus.BAD_REQUEST.value())
//                            .message(e.getMessage())
//                            .build()
//            );
//        }
//    }
//
//    @DeleteMapping("/{cateId}")
//    public ResponseEntity<ApiResponse<Void>> deleteCategory(@PathVariable int cateId) {
//        try {
//            categoryService.deleteCategory(cateId);
//            return ResponseEntity.ok(
//                    ApiResponse.<Void>builder()
//                            .message("Xóa category thành công")
//                            .build()
//            );
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
//                    ApiResponse.<Void>builder()
//                            .code(HttpStatus.BAD_REQUEST.value())
//                            .message(e.getMessage())
//                            .build()
//            );
//        }
//    }

}
