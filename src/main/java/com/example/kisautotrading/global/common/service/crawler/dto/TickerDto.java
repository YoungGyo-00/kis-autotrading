package com.example.kisautotrading.global.common.service.crawler.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class TickerDto {
    private String itemCode;
    private String itemName;

    public static TickerDto of (String itemCode, String itemName) {
        return TickerDto.builder()
                .itemCode(itemCode)
                .itemName(itemName)
                .build();
    }
}
