package com.example.kisautotrading.global.config.util.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.JsonNode;
import lombok.Getter;

@Getter
public class Output {
    @JsonProperty("output")
    private JsonNode output;
}
