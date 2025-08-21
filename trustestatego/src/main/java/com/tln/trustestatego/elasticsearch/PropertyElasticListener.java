package com.tln.trustestatego.elasticsearch;

import com.tln.trustestatego.document.PropertyDocument;
import com.tln.trustestatego.entity.Property;
import com.tln.trustestatego.mapper.PropertyMapper;
import com.tln.trustestatego.repository.PropertyRepository;
import com.tln.trustestatego.repository.PropertySearchRepository;
import jakarta.persistence.PostPersist;
import jakarta.persistence.PostRemove;
import jakarta.persistence.PostUpdate;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class PropertyElasticListener {
    PropertyMapper propertyMapper;
    PropertySearchRepository propertySearchRepository;

    @PostPersist
    @PostUpdate
    public void syncToElasticsearch(Property property){
        PropertyDocument propertyDocument = propertyMapper.toPropertyDocument(property);
        propertySearchRepository.save(propertyDocument);
    }

    @PostRemove
    public void removeFromElasticsearch(Property property) {
        propertySearchRepository.deleteById(property.getId());
    }
}
