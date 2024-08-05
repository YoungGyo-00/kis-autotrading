package com.example.kisautotrading.domain.trading.vo;

import com.example.kisautotrading.global.common.entity.OrderType;
import lombok.Builder;
import lombok.Getter;

@Getter
public class OrderInfo {
    private String accountNumber;
    private String accountProductCode;
    private String itemName;
    private String itemCode;
    private String orderDivision;
    private OrderType orderType;
    private String orderQuantity;
    private String orderPrice;
    private String orderAmount;

    @Builder
    public OrderInfo(String accountNumber, String accountProductCode, String itemName, String itemCode, String orderDivision, OrderType orderType, String orderQuantity, String orderPrice, String orderAmount) {
        this.accountNumber = accountNumber;
        this.accountProductCode = accountProductCode;
        this.itemName = itemName;
        this.itemCode = itemCode;
        this.orderDivision = orderDivision;
        this.orderType = orderType;
        this.orderQuantity = orderQuantity;
        this.orderPrice = orderPrice;
        this.orderAmount = orderAmount;
    }

    public static OrderInfo of(String accountNumber, String accountProductCode, String itemName, String itemCode, String orderDivision, OrderType orderType, String orderQuantity, String orderPrice) {
        return OrderInfo.builder()
                .accountNumber(accountNumber)
                .accountProductCode(accountProductCode)
                .itemName(itemName)
                .itemCode(itemCode)
                .orderDivision(orderDivision)
                .orderType(orderType)
                .orderQuantity(orderQuantity)
                .orderPrice(orderPrice)
                .orderAmount("0")
                .build();
    }
}
