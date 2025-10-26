package com.tln.trustestatego.elasticsearch;

import com.tln.trustestatego.document.PropertyDocument;
import com.tln.trustestatego.service.PropertyService;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
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
@ConditionalOnProperty(prefix = "app.elastic", name = "enabled", havingValue = "true")
@RequiredArgsConstructor
public class ElasticsearchIndexInitializer {

    private final ElasticsearchOperations elasticsearchOperations;
    private final PropertyService propertyService;

    @PostConstruct
    public void init() {
        try {
            IndexOperations indexOps = elasticsearchOperations.indexOps(PropertyDocument.class);

            // Xóa index cũ (chỉ nên dùng trong dev, cẩn thận khi chạy production!)
            if (indexOps.exists()) {
                log.info("Index 'properties' đã tồn tại, đang xóa để tạo lại...");
                indexOps.delete();
            }

            // Đọc file settings.json từ resources
            Document settings = loadSettingsJson();

            // Tạo index với custom settings
            log.info("Đang tạo index 'properties' với custom settings...");
            indexOps.create(settings);

            // Áp dụng mapping từ PropertyDocument
            indexOps.putMapping(indexOps.createMapping(PropertyDocument.class));

            log.info("✅ Đã tạo thành công index 'properties' với settings + mappings");

            // 👉 Sau khi tạo index xong thì reindex data từ DB vào ES
            propertyService.reindexAllProperties();
            log.info("✅ Đã reindex dữ liệu từ database vào Elasticsearch");

        } catch (Exception e) {
            log.error("❌ Lỗi khi khởi tạo Elasticsearch index: ", e);
            throw new RuntimeException("Không thể khởi tạo Elasticsearch index", e);
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