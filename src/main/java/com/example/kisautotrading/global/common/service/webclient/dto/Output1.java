package com.example.kisautotrading.global.common.service.webclient.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.JsonNode;
import lombok.Getter;

@Getter
public class Output1 implements OutputInterface{
    @JsonProperty("output1")
    private JsonNode output;
}
