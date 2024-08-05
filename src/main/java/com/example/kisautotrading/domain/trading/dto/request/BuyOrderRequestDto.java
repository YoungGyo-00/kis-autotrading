package com.example.kisautotrading.domain.trading.dto.request;

import com.example.kisautotrading.domain.trading.vo.OrderInfo;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class BuyOrderRequestDto {
    @JsonProperty("CANO")
    private String accountNumber;

    @JsonProperty("ACNT_PRDT_CD")
    private String accountProductCode;

    @JsonProperty("PDNO")
    private String itemCode;

    @JsonProperty("ORD_DVSN")
    private String orderDivision;

    @JsonProperty("ORD_QTY")
    private String orderQuantity;

    @JsonProperty("ORD_UNPR")
    private String orderPrice;

    public static BuyOrderRequestDto from(OrderInfo orderInfo) {
        return BuyOrderRequestDto.builder()
                .accountNumber(orderInfo.getAccountNumber())
                .accountProductCode(orderInfo.getAccountProductCode())
                .itemCode(orderInfo.getItemCode())
                .orderDivision(orderInfo.getOrderDivision())
                .orderQuantity(orderInfo.getOrderQuantity())
                .orderPrice(orderInfo.getOrderPrice())
                .build();
    }
}
