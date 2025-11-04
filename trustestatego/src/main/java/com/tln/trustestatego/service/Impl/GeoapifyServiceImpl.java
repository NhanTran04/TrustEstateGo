package com.tln.trustestatego.service.Impl;

import com.tln.trustestatego.service.GeoapifyService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class GeoapifyServiceImpl implements GeoapifyService {
    private final WebClient geoapifyWebClient;

    @Value("${geoapify.api-key}")
    private String apiKey;

    @Override
    public Optional<double[]> geocode(String address) {
        if (address == null || address.isBlank()) return Optional.empty();

        try {
            Map<?, ?> response = geoapifyWebClient.get()
                    .uri(uriBuilder -> uriBuilder
                            .path("/search")
                            .queryParam("text", address)
                            .queryParam("limit", 1)
                            .queryParam("apiKey", apiKey)
                            .build())
                    .retrieve()
                    .bodyToMono(Map.class)
                    .block();

            if (response != null && response.get("features") instanceof List<?> features && !features.isEmpty()) {
                Map<?, ?> first = (Map<?, ?>) features.get(0);
                Map<?, ?> geometry = (Map<?, ?>) first.get("geometry");
                List<?> coords = (List<?>) geometry.get("coordinates"); // [lon, lat]
                double lat = ((Number) coords.get(1)).doubleValue();
                double lon = ((Number) coords.get(0)).doubleValue();
                return Optional.of(new double[]{lat, lon});
            }
        } catch (Exception e) {
            log.error("Geoapify geocode error for '{}': {}", address, e.getMessage());
        }
        return Optional.empty();
    }
}
