package com.tln.trustestatego.service.Impl;

import com.tln.trustestatego.repository.PropertyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
@RequiredArgsConstructor
public class PropertyCoordinateUpdater {
    private final PropertyRepository propertyRepository;
    private final GeoapifyServiceImpl geoapifyService;

    @Transactional
    public void updateAllCoordinates() {
        var properties = propertyRepository.findAll();

        for (var property : properties) {
            if (property.getLatitude() == null || property.getLongitude() == null) {
                geoapifyService.geocode(property.getLocation()).ifPresent(coords -> {
                    property.setLatitude(coords[0]);
                    property.setLongitude(coords[1]);
                });
            }
        }

        propertyRepository.saveAll(properties);
        System.out.println("✅ Đã cập nhật xong toàn bộ tọa độ!");
    }
}
