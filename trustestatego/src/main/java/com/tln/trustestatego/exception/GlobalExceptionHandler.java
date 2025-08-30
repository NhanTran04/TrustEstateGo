package com.tln.trustestatego.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(Exception.class)
    public ResponseEntity<Map<String, Object>> handleException(Exception ex) {
        Map<String, Object> error = new HashMap<>();
        error.put("error", ex.getMessage());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
    }

    // Xử lý riêng cho category không tìm thấy
//    @ExceptionHandler(CategoryNotFoundException.class)
//    public ResponseEntity<Map<String, Object>> handleCategoryNotFound(CategoryNotFoundException ex) {
//        Map<String, Object> error = new HashMap<>();
//        error.put("error", ex.getMessage());
//        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
//    }
}
