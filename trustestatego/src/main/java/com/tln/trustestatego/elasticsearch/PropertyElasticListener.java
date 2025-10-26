package com.tln.trustestatego.elasticsearch;

import com.tln.trustestatego.document.PropertyDocument;
import com.tln.trustestatego.entity.Property;
import com.tln.trustestatego.mapper.PropertyMapper;
import com.tln.trustestatego.repository.PropertySearchRepository;
import jakarta.persistence.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Slf4j
@ConditionalOnProperty(prefix = "app.elastic", name = "enabled", havingValue = "true")
public class PropertyElasticListener {

    private final PropertySearchRepository repository;
    private final PropertyMapper propertyMapper;

    @PostPersist
    @PostUpdate
    public void onSaveOrUpdate(Property property) {
        PropertyDocument doc = propertyMapper.toPropertyDocument(property);
        repository.save(doc);
    }

    @PostRemove
    public void onDelete(Property property) {
        repository.deleteById(property.getId().toString());
    }
}