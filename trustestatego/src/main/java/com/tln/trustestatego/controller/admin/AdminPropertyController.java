package com.tln.trustestatego.controller.admin;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.tln.trustestatego.dto.request.PropertyRequest;
import com.tln.trustestatego.dto.response.ApiResponse;
import com.tln.trustestatego.dto.response.PageResponse;
import com.tln.trustestatego.dto.response.PropertyResponse;
import com.tln.trustestatego.service.PropertyService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RequestMapping("/api/admin/properties")
@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AdminPropertyController {
    PropertyService propertyService;

//    @GetMapping
//    public ResponseEntity<List<PropertyResponse>> getProperties(@RequestParam Map<String, String> params,Pageable pageable) {
//        var pageResponse = propertyService.getPropertyFromAdmin(params, pageable);
//        int start = pageable.getPageNumber() * pageable.getPageSize();
//        int end = start + pageResponse.getContent().size() - 1;
//
//        HttpHeaders headers = new HttpHeaders();
//        headers.add("Content-Range",
//                "reviews " + start + "-" + end + "/" + pageResponse.getTotalElements());
//        headers.add("Access-Control-Expose-Headers", "Content-Range");
//        return new ResponseEntity<>(pageResponse.getContent(), headers, HttpStatus.OK);
//    }

    @GetMapping
    public ResponseEntity<List<PropertyResponse>> getProperties(
            @RequestParam(name = "filter", required = false) String filter,
            @RequestParam(name = "range", required = false) String range,
            @RequestParam(name = "sort", required = false) String sort // 👈 thêm sort
    ) throws JsonProcessingException {

        ObjectMapper mapper = new ObjectMapper();

        Map<String, String> filters = new HashMap<>();
        if (filter != null && !filter.equals("{}")) {
            filters = mapper.readValue(filter, new TypeReference<Map<String, String>>() {});
        }

        // Parse range -> pageable
        int page = 0;
        int size = 5; // mặc định
        if (range != null) {
            List<Integer> rangeList = mapper.readValue(range, new TypeReference<List<Integer>>() {});
            int start = rangeList.get(0);
            int end   = rangeList.get(1);
            size = end - start + 1;
            page = start / size;
        }

        // Parse sort
        Sort sortObj = Sort.unsorted();
        if (sort != null && !sort.equals("[]")) {
            List<String> sortList = mapper.readValue(sort, new TypeReference<List<String>>() {});
            String field = sortList.get(0);
            String direction = sortList.get(1);
            sortObj = Sort.by(Sort.Direction.fromString(direction), field);
        }

        Pageable pageable = PageRequest.of(page, size, sortObj);

        // Gọi service
        var pageResponse = propertyService.getPropertyFromAdmin(filters, pageable);

        int start = pageable.getPageNumber() * pageable.getPageSize();
        int end   = start + pageResponse.getContent().size() - 1;

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Range", "properties " + start + "-" + end + "/" + pageResponse.getTotalElements());
        headers.add("Access-Control-Expose-Headers", "Content-Range");

        return new ResponseEntity<>(pageResponse.getContent(), headers, HttpStatus.OK);
    }


    @GetMapping("/{propertyId}")
    public ResponseEntity<PropertyResponse> getPropertyById(@PathVariable int propertyId) {
        return ResponseEntity.ok(propertyService.getPropertyById(propertyId));
    }

    @PostMapping(consumes = {MediaType.MULTIPART_FORM_DATA_VALUE,
            MediaType.APPLICATION_FORM_URLENCODED_VALUE}
    )
    public ResponseEntity<PropertyResponse> createProperty(@ModelAttribute PropertyRequest propertyRequest) {
        return ResponseEntity.status(HttpStatus.CREATED).body(propertyService.createProperty(propertyRequest));
    }

//    @PutMapping(path = "/{propertyId}", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE,
//            MediaType.APPLICATION_FORM_URLENCODED_VALUE})
//    public ResponseEntity<PropertyResponse> updateProperty(
//            @PathVariable int propertyId,
//            @ModelAttribute PropertyRequest propertyRequest) {
//        return ResponseEntity.ok(propertyService.updateProperty(propertyId, propertyRequest));
//    }

    // UPDATE - với multipart (có file)
    @PutMapping(path = "/{propertyId}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<PropertyResponse> updatePropertyWithFiles(
            @PathVariable int propertyId,
            @ModelAttribute PropertyRequest propertyRequest) {
        return ResponseEntity.ok(propertyService.updateProperty(propertyId, propertyRequest));
    }

    // UPDATE - với JSON (không có file)
    @PutMapping(path = "/{propertyId}", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<PropertyResponse> updatePropertyWithoutFiles(
            @PathVariable int propertyId,
            @RequestBody PropertyRequest propertyRequest) {
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
