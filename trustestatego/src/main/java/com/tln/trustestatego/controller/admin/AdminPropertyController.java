package com.tln.trustestatego.controller.admin;

import com.tln.trustestatego.dto.request.PropertyRequest;
import com.tln.trustestatego.dto.response.ApiResponse;
import com.tln.trustestatego.dto.response.PageResponse;
import com.tln.trustestatego.dto.response.PropertyResponse;
import com.tln.trustestatego.service.PropertyService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RequestMapping("/api/admin/properties")
@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AdminPropertyController {
    PropertyService propertyService;

    @GetMapping
    public ResponseEntity<List<PropertyResponse>> getProperties(@RequestParam Map<String, String> params,Pageable pageable) {
        var pageResponse = propertyService.getPropertyFromAdmin(params, pageable);
        int start = pageable.getPageNumber() * pageable.getPageSize();
        int end = start + pageResponse.getContent().size() - 1;

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Range",
                "reviews " + start + "-" + end + "/" + pageResponse.getTotalElements());
        headers.add("Access-Control-Expose-Headers", "Content-Range");
        return new ResponseEntity<>(pageResponse.getContent(), headers, HttpStatus.OK);
    }

    @GetMapping("/users/{userId}")
    public ResponseEntity<List<PropertyResponse>> getPropertyByUserId(@PathVariable int userId, Pageable pageable) {
        var pageResponse = propertyService.getPropertyByUserId(userId, pageable);
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Range", "properties 0-" + (pageResponse.getContent().size() - 1) + "/" + pageResponse.getTotalElements());
        headers.add("Access-Control-Expose-Headers", "Content-Range");
        return new ResponseEntity<>(pageResponse.getContent(), headers, HttpStatus.OK);
    }

    @GetMapping("/{propertyId}")
    public ResponseEntity<PropertyResponse> getPropertyById(@PathVariable int propertyId) {
        return ResponseEntity.ok(propertyService.getPropertyById(propertyId));
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<PropertyResponse> createProperty(@ModelAttribute PropertyRequest propertyRequest) {
        return ResponseEntity.status(HttpStatus.CREATED).body(propertyService.createProperty(propertyRequest));
    }

    @PutMapping(path = "/{propertyId}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<PropertyResponse> updateProperty(
            @PathVariable int propertyId,
            @ModelAttribute PropertyRequest propertyRequest) {
        return ResponseEntity.ok(propertyService.updateProperty(propertyId, propertyRequest));
    }

//    @GetMapping("/search")
//    public ResponseEntity<List<?>> searchProperties(@RequestParam Map<String, String> params, Pageable pageable) {
//        var pageResponse = propertyService.searchProperty(params, pageable);
//        HttpHeaders headers = new HttpHeaders();
//        headers.add("Content-Range", "properties 0-" + (pageResponse.getContent().size() - 1) + "/" + pageResponse.getTotalElements());
//        headers.add("Access-Control-Expose-Headers", "Content-Range");
//        return new ResponseEntity<>(pageResponse.getContent(), headers, HttpStatus.OK);
//    }

    @DeleteMapping("/{propertyId}")
    public ResponseEntity<Void> deleteProperty(@PathVariable int propertyId) {
        propertyService.deleteProperty(propertyId);
        return ResponseEntity.ok().build();
    }
}
