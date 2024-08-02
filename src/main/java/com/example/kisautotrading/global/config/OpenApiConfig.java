package com.example.kisautotrading.global.config;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {
    @Bean
    public OpenAPI openAPI() {
        Info info = new Info()
                .title("Kis Autotrading API Document")
                .version("v0.1")
                .description("자동 트레이딩 시스템 API");
        return new OpenAPI()
                .components(new Components())
                .info(info);
    }
}
