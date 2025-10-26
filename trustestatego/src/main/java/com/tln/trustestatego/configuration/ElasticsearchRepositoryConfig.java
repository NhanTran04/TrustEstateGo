package com.tln.trustestatego.configuration;

import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.elasticsearch.repository.config.EnableElasticsearchRepositories;

@Configuration
@ConditionalOnProperty(prefix = "app.elastic", name = "enabled", havingValue = "true")
@EnableElasticsearchRepositories(basePackages = "com.tln.trustestatego.repository")
public class ElasticsearchRepositoryConfig {
}
