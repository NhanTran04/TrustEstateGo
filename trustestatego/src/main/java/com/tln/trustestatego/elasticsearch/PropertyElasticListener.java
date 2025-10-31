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
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Slf4j
@ConditionalOnProperty(prefix = "app.elastic", name = "enabled", havingValue = "true")
public class PropertyElasticListener {

    private final ApplicationEventPublisher publisher;

    @PostPersist
    @PostUpdate
    public void onSaveOrUpdate(Property property) {
        publisher.publishEvent(new PropertyIndexEvent(property.getId(), false));
        log.debug("📤 Published index event for property {}", property.getId());
    }

    @PostRemove
    public void onDelete(Property property) {
        publisher.publishEvent(new PropertyIndexEvent(property.getId(), true));
        log.debug("📤 Published delete event for property {}", property.getId());
    }
}
