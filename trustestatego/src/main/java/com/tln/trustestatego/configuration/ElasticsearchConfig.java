package com.tln.trustestatego.configuration;

import co.elastic.clients.elasticsearch.ElasticsearchClient;
import co.elastic.clients.transport.rest_client.RestClientTransport;
import co.elastic.clients.json.jackson.JacksonJsonpMapper;
import org.apache.http.HttpHost;
import org.elasticsearch.client.RestClient;
import org.elasticsearch.client.RestClientBuilder;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConditionalOnProperty(
        prefix = "app.elastic",
        name = "enabled",
        havingValue = "true",
        matchIfMissing = false
)
public class ElasticsearchConfig {

    @Bean
    public ElasticsearchClient elasticsearchClient() {
        RestClientBuilder builder = RestClient.builder(
                new HttpHost("localhost", 9200, "http")
        );

        RestClientTransport transport = new RestClientTransport(builder.build(), new JacksonJsonpMapper());
        return new ElasticsearchClient(transport);
    }
}
