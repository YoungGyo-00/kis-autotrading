package com.example.kisautotrading.domain.quotation.vo;

import lombok.Builder;
import lombok.Getter;

@Getter
public class QuotationInfoVo {
    private String tradingDate;
    private String itemCode;
    private String itemName;

    @Builder
    public QuotationInfoVo(String tradingDate, String itemCode, String itemName) {
        this.tradingDate = tradingDate;
        this.itemCode = itemCode;
        this.itemName = itemName;
    }
}
