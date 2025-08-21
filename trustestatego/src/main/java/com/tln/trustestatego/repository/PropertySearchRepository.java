package com.tln.trustestatego.repository;

import com.tln.trustestatego.document.PropertyDocument;
import com.tln.trustestatego.dto.response.PropertyResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Map;

public interface PropertySearchRepository extends ElasticsearchRepository<PropertyDocument, Integer> {
//    Page<PropertyResponse> findByTitleContainingIgnoreCaseOrLocationContainingIgnoreCaseAndPriceBetween
//            (Map<String, String> params);
}
