package com.tln.trustestatego.elasticsearch;

import com.tln.trustestatego.document.PropertyDocument;
import com.tln.trustestatego.entity.Property;
import com.tln.trustestatego.mapper.PropertyMapper;
import com.tln.trustestatego.repository.PropertySearchRepository;
import jakarta.persistence.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.ObjectProvider;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Slf4j
@ConditionalOnProperty(prefix = "app.elastic", name = "enabled", havingValue = "true")
public class PropertyElasticListener {

    private final ObjectProvider<PropertySearchRepository> repositoryProvider;
    private final PropertyMapper propertyMapper;

    @PostPersist
    @PostUpdate
    public void onSaveOrUpdate(Property property) {
        PropertySearchRepository repository = repositoryProvider.getIfAvailable();
        if (repository == null) {
            log.warn("⚠️ Elasticsearch repository not available, skipping index update for property {}", property.getId());
            return;
        }

        try {
            PropertyDocument doc = propertyMapper.toPropertyDocument(property);
            repository.save(doc);
            log.info("✅ Indexed property {} to Elasticsearch", property.getId());
        } catch (Exception e) {
            log.error("❌ Error indexing property {}: {}", property.getId(), e.getMessage());
        }
    }

    @PostRemove
    public void onDelete(Property property) {
        PropertySearchRepository repository = repositoryProvider.getIfAvailable();
        if (repository == null) {
            log.warn("⚠️ Elasticsearch repository not available, skipping delete for property {}", property.getId());
            return;
        }

        try {
            repository.deleteById(property.getId().toString());
            log.info("🗑️ Deleted property {} from Elasticsearch", property.getId());
        } catch (Exception e) {
            log.error("❌ Error deleting property {} from Elasticsearch: {}", property.getId(), e.getMessage());
        }
    }
}
