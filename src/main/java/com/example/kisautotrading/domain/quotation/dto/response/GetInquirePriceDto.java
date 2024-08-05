package com.example.kisautotrading.domain.quotation.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;

@Getter
public class GetInquirePriceDto implements PriceInfo {
    @JsonProperty("stck_oprc")
    private String startPrice;

    @JsonProperty("stck_prpr")
    private String endPrice;

    @JsonProperty("stck_hgpr")
    private String topPrice;

    @JsonProperty("stck_lwpr")
    private String lowestPrice;

    @JsonProperty("acml_vol")
    private String totalTradingQuantity;
}