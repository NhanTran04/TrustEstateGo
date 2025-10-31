package com.tln.trustestatego.elasticsearch;

import com.tln.trustestatego.document.PropertyDocument;
import com.tln.trustestatego.mapper.PropertyMapper;
import com.tln.trustestatego.repository.PropertyRepository;
import com.tln.trustestatego.repository.PropertySearchRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;
import org.springframework.transaction.event.TransactionalEventListener;
import org.springframework.transaction.event.TransactionPhase;

@Component
@RequiredArgsConstructor
@Slf4j
public class PropertyElasticEventHandler {

    private final PropertyRepository propertyRepository;
    private final PropertyMapper propertyMapper;
    private final PropertySearchRepository propertySearchRepository;

    // chạy sau khi transaction DB commit
    @Async // (tùy chọn, nếu muốn non-blocking)
    @TransactionalEventListener(phase = TransactionPhase.AFTER_COMMIT)
    public void handle(PropertyIndexEvent event) {
        Integer id = event.getPropertyId();

        if (event.isDeleted()) {
            propertySearchRepository.deleteById(id.toString());
            log.info("🗑️ Deleted property {} from Elasticsearch", id);
            return;
        }

        propertyRepository.findByIdForIndexing(id).ifPresent(property -> {
            PropertyDocument doc = propertyMapper.toPropertyDocument(property);
            propertySearchRepository.save(doc);
            log.info("✅ Indexed property {} to Elasticsearch", id);
        });
    }
}
