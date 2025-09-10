package com.tln.trustestatego.configuration;

import org.apache.catalina.connector.Connector;
import org.springframework.boot.web.embedded.tomcat.TomcatServletWebServerFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.multipart.MultipartResolver;
import org.springframework.web.multipart.support.StandardServletMultipartResolver;

@Configuration
public class Webconfig {
    @Bean
    public TomcatServletWebServerFactory tomcatFactory() {
        return new TomcatServletWebServerFactory() {
            @Override
            protected void customizeConnector(Connector connector) {
                super.customizeConnector(connector);
                connector.setMaxParameterCount(2000); // default là 10000, chỉnh cao hơn nếu cần
            }
        };
    }
}
