package com.example.kisautotrading.global.common.service.webclient;

import com.example.kisautotrading.global.common.service.user.OAuthService;
import com.example.kisautotrading.global.common.service.webclient.dto.Output;
import com.example.kisautotrading.global.common.service.webclient.dto.OutputInterface;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.util.UriBuilder;
import reactor.core.publisher.Mono;

import java.util.List;
import java.util.Map;

@Slf4j
@Service
@RequiredArgsConstructor
public class WebClientService {
    private final WebClient webClient;
    private final OAuthService oAuthService;
    private final ObjectMapper objectMapper;
    private final String Bearer = "Bearer ";

    public <T> T getSingle(String url, Map<String, String> queryParams, String trId, Class<T> responseDtoClass, Class<? extends OutputInterface> outputClass) {
        String accessToken = oAuthService.getToken();

        return webClient.method(HttpMethod.GET)
                .uri(uriBuilder -> {
                    UriBuilder builder = uriBuilder.path(url);
                    if (queryParams != null) {
                        queryParams.forEach(builder::queryParam);
                    }
                    return builder.build();
                })
                .header("authorization", Bearer+accessToken)
                .header("tr_id", trId)
                .retrieve()
                .onStatus(
                        status -> status.is4xxClientError() || status.is5xxServerError(),
                        clientResponse -> {
                            log.error("Error Status Code: {}", clientResponse.statusCode());
                            return clientResponse.bodyToMono(String.class).flatMap(errorBody -> {
                                log.error("Error Body: {}", errorBody);
                                return Mono.error(new RuntimeException("API call failed with status code " + clientResponse.statusCode()));
                            });
                        }
                )
                .bodyToMono(String.class)
                .map(responseBody -> {
                    try {
                        OutputInterface output = objectMapper.readValue(responseBody, outputClass);
                        return objectMapper.treeToValue(output.getOutput(), responseDtoClass);
                    } catch (Exception e) {
                        log.error("Failed to parse JSON response ", e);
                        throw new RuntimeException("Failed to parse JSON response", e);
                    }
                })
                .block();
    }

    public <T> List<T> getList(String url, Map<String, String> queryParams, String trId, Class<T> responseDtoClass, Class<? extends OutputInterface> outputClass) {
        String accessToken = oAuthService.getToken();

        return (List<T>) webClient.method(HttpMethod.GET)
                .uri(uriBuilder -> {
                    UriBuilder builder = uriBuilder.path(url);
                    if (queryParams != null) {
                        queryParams.forEach(builder::queryParam);
                    }
                    return builder.build();
                })
                .header("authorization", "Bearer " + accessToken)
                .header("tr_id", trId)
                .retrieve()
                .onStatus(
                        status -> status.is4xxClientError() || status.is5xxServerError(),
                        clientResponse -> {
                            log.error("Error Status Code: {}", clientResponse.statusCode());
                            return clientResponse.bodyToMono(String.class).flatMap(errorBody -> {
                                log.error("Error Body: {}", errorBody);
                                return Mono.error(new RuntimeException("API call failed with status code " + clientResponse.statusCode()));
                            });
                        }
                )
                .bodyToMono(String.class)
                .map(responseBody -> {
                    try {
                        OutputInterface output = objectMapper.readValue(responseBody, outputClass);
                        return objectMapper.convertValue(output.getOutput(), objectMapper.getTypeFactory().constructCollectionType(List.class, responseDtoClass));
                    } catch (Exception e) {
                        throw new RuntimeException("Failed to parse JSON response", e);
                    }
                })
                .block();
    }

    public <T, V> T post(String url, String trId, V requestDto, Class<T> responseDtoClass) {
        String accessToken = oAuthService.getToken();

        return webClient.method(HttpMethod.GET)
                .uri(url)
                .header("authorization", Bearer+accessToken)
                .header("tr_id", trId)
                .bodyValue(requestDto)
                .retrieve()
                .onStatus(
                        status -> status.is4xxClientError() || status.is5xxServerError(),
                        clientResponse -> {
                            log.error("Error Status Code: {}", clientResponse.statusCode());
                            return clientResponse.bodyToMono(String.class).flatMap(errorBody -> {
                                log.error("Error Body: {}", errorBody);
                                return Mono.error(new RuntimeException("API call failed with status code " + clientResponse.statusCode()));
                            });
                        }
                )
                .bodyToMono(String.class)
                .map(responseBody -> {
                    try {
                        Output output = objectMapper.readValue(responseBody, Output.class);
                        JsonNode outputNode = output.getOutput();
                        return objectMapper.treeToValue(outputNode, responseDtoClass);
                    } catch (Exception e) {
                        throw new RuntimeException("Failed to parse JSON response", e);
                    }
                })
                .block();
    }
}
