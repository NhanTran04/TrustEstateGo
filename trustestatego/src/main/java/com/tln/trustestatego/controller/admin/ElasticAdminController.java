package com.tln.trustestatego.controller.admin;

import com.tln.trustestatego.service.PropertyService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin/elasticsearch")
public class ElasticAdminController {
    private final PropertyService propertyService;
    public ElasticAdminController(PropertyService propertyService) {
        this.propertyService = propertyService;
    }

    @PostMapping("/reindex")
    public ResponseEntity<String> reindex() {
        propertyService.reindexAllProperties();
        return ResponseEntity.ok("Reindex started");
    }
}

