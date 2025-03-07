package com.lootopia.server.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class CORSConfig {
    @Value("${spring.cors.allowed.origins}")
    private String origins;

    @Value("${spring.cors.allowed.methods}")
    private String methods;

    @Value("${spring.cors.allowed.headers}")
    private String headers;

    @Value("${spring.cors.allowed.credentials}")
    private boolean credentials;

    @Bean
    public WebMvcConfigurer cordConfig() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                        .allowedOrigins(origins)
                        .allowedMethods(methods)
                        .allowedHeaders(headers)
                        .allowCredentials(credentials);
            }
        };
    }
}
