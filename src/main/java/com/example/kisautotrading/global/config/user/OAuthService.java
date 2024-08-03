package com.example.kisautotrading.global.config.user;

import com.example.kisautotrading.global.config.user.dto.OAuthReqeustDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.Map;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class OAuthService {

    @Value("${app.key}")
    private String APP_KEY;

    @Value("${app.secret}")
    private String APP_SECRET;

    private final WebClient webClient;

    public String getToken() {
        OAuthReqeustDto requestBody = OAuthReqeustDto.builder()
                .grant_type("client_credentials")
                .appkey(APP_KEY)
                .appsecret(APP_SECRET)
                .build();

        return webClient.post()
                .uri("/oauth2/tokenP")
                .bodyValue(requestBody)
                .retrieve()
                .bodyToMono(Map.class)
                .map(response -> response.get("access_token").toString())
                .block();
    }
}
