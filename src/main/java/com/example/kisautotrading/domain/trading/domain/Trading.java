package com.example.kisautotrading.domain.trading.domain;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

// 주문체결내역
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity(name = "TRDNG_LST")
public class Trading {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id", nullable = false)
    private Order order;

    @Column(name = "ITM_NM")
    private String itemName; // 종목명

    @Column(name = "TRDNG_PRC")
    private String tradingPrice; // 체결가격

    @Column(name = "TRDNG_QNTY")
    private String tradingQuantity; // 체결량

    @Column(name = "TRDNG_AMT")
    private String tradingAmount; // 거래금액

    @Builder
    public Trading(Order order, String itemName, String tradingPrice, String tradingQuantity, String tradingAmount) {
        this.order = order;
        this.itemName = itemName;
        this.tradingPrice = tradingPrice;
        this.tradingQuantity = tradingQuantity;
        this.tradingAmount = tradingAmount;
    }
}
