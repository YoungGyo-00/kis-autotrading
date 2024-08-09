package com.example.kisautotrading.domain.trading.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;

@Getter
public class InquireBalanceResponseDto {
    @JsonProperty("pdno")
    private String productNo; // 종목번호

    @JsonProperty("prdt_name")
    private String productName; // 종목명

    @JsonProperty("hldg_qty")
    private String heldQuantity; // 보유수량

    @JsonProperty("pchs_avg_pric")
    private String purchaseAveragePrice; // 매입평균

    @JsonProperty("prpr")
    private String presentPrive; // 현재가

    @JsonProperty("evlu_amt")
    private String evalutaeAmount; // 평가금액
}
