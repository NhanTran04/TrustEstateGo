package com.tln.trustestatego.controller.admin;

import com.tln.trustestatego.service.RevenueService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin/revenue")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AdminRevenueController {

    RevenueService revenueService;

    @GetMapping("/month/{year}")
    public ResponseEntity<?> revenueByMonth(@PathVariable int year) {
        return ResponseEntity.ok(revenueService.getRevenueByMonth(year));
    }

    @GetMapping("/quarter/{year}")
    public ResponseEntity<?> revenueByQuarter(@PathVariable int year) {
        return ResponseEntity.ok(revenueService.getRevenueByQuarter(year));
    }

    @GetMapping("/year/{year}")
    public ResponseEntity<?> revenueByYear(@PathVariable int year) {
        return ResponseEntity.ok(revenueService.getRevenueByYear(year));
    }
}
