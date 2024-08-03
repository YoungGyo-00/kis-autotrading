package com.example.kisautotrading.global.config.user;

import com.example.kisautotrading.global.config.user.dto.OAuthReqeustDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.reactive.function.client.WebClient;

import java.time.Instant;
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
    private String accessToken;
    private Instant tokenExpiry;

    public String getToken() {
        if (accessToken == null || Instant.now().isAfter(tokenExpiry)) {
            OAuthReqeustDto requestBody = OAuthReqeustDto.builder()
                    .grant_type("client_credentials")
                    .appkey(APP_KEY)
                    .appsecret(APP_SECRET)
                    .build();

            Map<String, Object> response = webClient.post()
                .uri("/oauth2/tokenP")
                .bodyValue(requestBody)
                .retrieve()
                .bodyToMono(Map.class)
                .block();

            accessToken = response.get("access_token").toString();
            long expiresIn = Long.parseLong(response.get("expires_in").toString());
            tokenExpiry = Instant.now().plusSeconds(expiresIn);
        }

        return accessToken;
    }
}
