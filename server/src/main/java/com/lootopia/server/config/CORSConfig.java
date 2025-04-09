package com.lootopia.server.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

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
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();

        configuration.setAllowedOrigins(origins.equals("*") ? List.of("*") : List.of(origins.split(",")));
        configuration.setAllowedMethods(methods.equals("*") ? List.of("*") : List.of(methods.split(",")));
        configuration.setAllowedHeaders(headers.equals("*") ? List.of("*") : List.of(headers.split(",")));
        configuration.setAllowCredentials(credentials);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}