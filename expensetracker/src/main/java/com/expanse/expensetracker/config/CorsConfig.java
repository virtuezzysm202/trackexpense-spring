package com.expanse.expensetracker.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.*;
import org.springframework.web.filter.CorsFilter;

@Configuration
public class CorsConfig {

    @Bean
    public CorsFilter corsFilter() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowCredentials(true); // for send cookie/token
        config.addAllowedOrigin("http://localhost:7000");
        config.addAllowedHeader("*");
        config.addAllowedMethod("*"); // GET, POST, etc

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config); // all endpoint 

        return new CorsFilter(source);
    }
}
