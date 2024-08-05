package com.example.kisautotrading.domain.trading.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;

@Getter
public class BuyOrderResponseDto {
    @JsonProperty("KRX_FWDG_ORD_ORGNO")
    private String secompCode;

    @JsonProperty("ODNO")
    private String secompOrderNo;
}
