package com.example.kisautotrading.domain.order.domain;

import com.example.kisautotrading.global.common.entity.BaseTimeEntity;
import com.example.kisautotrading.global.common.entity.YN;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

// 주문내역
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity(name = "ORD_DIST")
public class OrderList extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id", nullable = false)
    private Order order;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_cancel_id", nullable = false)
    private OrderCancel orderCancel;

    @Column(name = "SECOMP_ORD_NO")
    private String secompOrderNo; // 증권사주문번호

    @Column(name = "ITM_CD")
    private String itemCode; // 종목코드

    @Column(name = "ITM_OPT_CD")
    private String itemOptionCode; // 주문옵션코드

    @Column(name = "ORD_PRC")
    private Long orderPrice; // 주문가격

    @Column(name = "TRDNG_PRC")
    private Long tradingPrice; // 체결가격

    @Column(name = "TRDNG_QNTY")
    private Long tradingQuantity; // 체결량

    @Column(name = "TRD_AMT")
    private Long tradingAmount; // 거래금액

    @Column(name = "SCSS_YN")
    @Enumerated(EnumType.STRING)
    private YN successYN; // 체결여부

    @Builder
    public OrderList(Order order, OrderCancel orderCancel, String secompOrderNo, String itemCode, String itemOptionCode, Long orderPrice, Long tradingPrice, Long tradingQuantity, Long tradingAmount, YN successYN) {
        this.order = order;
        this.orderCancel = orderCancel;
        this.secompOrderNo = secompOrderNo;
        this.itemCode = itemCode;
        this.itemOptionCode = itemOptionCode;
        this.orderPrice = orderPrice;
        this.tradingPrice = tradingPrice;
        this.tradingQuantity = tradingQuantity;
        this.tradingAmount = tradingAmount;
        this.successYN = successYN;
    }
}
