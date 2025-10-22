package com.tln.trustestatego.elasticsearch;

import com.tln.trustestatego.document.PropertyDocument;
import com.tln.trustestatego.service.PropertyService;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.ClassPathResource;
import org.springframework.data.elasticsearch.core.ElasticsearchOperations;
import org.springframework.data.elasticsearch.core.IndexOperations;
import org.springframework.data.elasticsearch.core.document.Document;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;

@Slf4j
@Component
@RequiredArgsConstructor
public class ElasticsearchIndexInitializer {

    private final ElasticsearchOperations elasticsearchOperations;
    private final PropertyService propertyService;

    @PostConstruct
    public void init() throws IOException {
        IndexOperations indexOps = elasticsearchOperations.indexOps(PropertyDocument.class);

        if (!indexOps.exists()) {
            log.info("Index 'properties' chưa tồn tại, đang tạo mới...");
            Document settings = loadSettingsJson();
            indexOps.create(settings);
            indexOps.putMapping(indexOps.createMapping(PropertyDocument.class));
            propertyService.reindexAllProperties();
            log.info("Index 'properties' đã được tạo và reindex dữ liệu");
        } else {
            log.info("Index 'properties' đã tồn tại, không làm gì cả.");
        }
    }

    private Document loadSettingsJson() throws IOException {
        ClassPathResource resource = new ClassPathResource("elasticsearch/settings.json");
        try (InputStream inputStream = resource.getInputStream()) {
            String json = new String(inputStream.readAllBytes(), StandardCharsets.UTF_8);
            return Document.parse(json);
        }
    }
}