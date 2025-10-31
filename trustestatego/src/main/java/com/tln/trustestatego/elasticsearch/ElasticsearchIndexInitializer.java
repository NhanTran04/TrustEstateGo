package com.tln.trustestatego.elasticsearch;

import com.tln.trustestatego.document.PropertyDocument;
import com.tln.trustestatego.service.PropertyService;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.core.io.ClassPathResource;
import org.springframework.data.elasticsearch.core.ElasticsearchOperations;
import org.springframework.data.elasticsearch.core.IndexOperations;
import org.springframework.data.elasticsearch.core.document.Document;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;

@Slf4j
@Component
@ConditionalOnProperty(prefix = "app.elastic", name = "enabled", havingValue = "true")
@RequiredArgsConstructor
public class ElasticsearchIndexInitializer {

    private final ElasticsearchOperations elasticsearchOperations;
    private final PropertyService propertyService;

    @Async
    public void reindexAsync() {
        propertyService.reindexAllProperties();
    }

    @PostConstruct
    public void init() {
        log.info("✅ Index 'properties' đã tồn tại, tiến hành reindex async...");
        reindexAsync();
    }


    private Document loadSettingsJson() throws IOException {
        ClassPathResource resource = new ClassPathResource("elasticsearch/settings.json");
        try (InputStream inputStream = resource.getInputStream()) {
            String json = new String(inputStream.readAllBytes(), StandardCharsets.UTF_8);
            return Document.parse(json);
        }
    }
}