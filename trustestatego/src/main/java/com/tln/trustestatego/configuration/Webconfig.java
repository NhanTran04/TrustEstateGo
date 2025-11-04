package com.tln.trustestatego.configuration;

import org.apache.catalina.connector.Connector;
import org.springframework.boot.web.embedded.tomcat.TomcatServletWebServerFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartResolver;
import org.springframework.web.multipart.support.StandardServletMultipartResolver;
import org.springframework.web.reactive.function.client.WebClient;

@Configuration
public class Webconfig {
//    @Bean
//    public TomcatServletWebServerFactory tomcatFactory() {
//        return new TomcatServletWebServerFactory() {
//            @Override
//            protected void customizeConnector(Connector connector) {
//                super.customizeConnector(connector);
//                connector.setMaxParameterCount(2000); // default là 10000, chỉnh cao hơn nếu cần
//            }
//        };
//    }

    @Bean
    public WebClient geoapifyWebClient() {
        return WebClient.builder()
                .baseUrl("https://api.geoapify.com/v1/geocode")
                .build();
    }
}
