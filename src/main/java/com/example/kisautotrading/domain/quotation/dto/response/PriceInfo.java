package com.example.kisautotrading.domain.quotation.dto.response;

public interface PriceInfo {
    String getStartPrice();
    String getEndPrice();
    String getTopPrice();
    String getLowestPrice();
    String getTotalTradingQuantity();
}
