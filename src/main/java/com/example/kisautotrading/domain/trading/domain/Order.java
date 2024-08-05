package com.example.kisautotrading.domain.trading.domain;

import com.example.kisautotrading.domain.trading.dto.response.OrderResponseDto;
import com.example.kisautotrading.domain.trading.vo.OrderInfo;
import com.example.kisautotrading.global.common.entity.BaseTimeEntity;
import com.example.kisautotrading.global.common.entity.OrderType;
import com.example.kisautotrading.global.common.entity.YN;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

// 주문내역
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity(name = "ORD_LST")
public class Order extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToMany(mappedBy = "order")
    private List<Trading> tradingList = new ArrayList<>();

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_cancel_id")
    private OrderCancel orderCancel;

    @Column(name = "SECOMP_CD")
    private String secompCode; // 증권사코드

    @Column(name = "SECOMP_ORD_NO")
    private String secompOrderNo; // 주문번호

    @Column(name = "ITM_NM")
    private String itemName; // 종목명

    @Column(name = "ITM_CD")
    private String itemCode; // 종목코드

    @Column(name = "ITM_OPT_CD")
    private String itemOptionCode; // 주문옵션코드

    @Column(name = "ORD_PRC")
    private String orderPrice; // 주문가격

    @Column(name = "ORD_QNTY")
    private String orderQuantity; // 주문량

    @Column(name = "ORD_AMT")
    private String orderAmount; // 주문량

    @Column(name = "ORD_TP")
    @Enumerated(EnumType.STRING)
    private OrderType orderType; // 매수매도여부

    @Column(name = "CNCL_YN")
    @Enumerated(EnumType.STRING)
    private YN cancelYN; // 취소여부

    @Column(name = "EFF_YN")
    @Enumerated(EnumType.STRING)
    private YN effectYN; // 유효여부

    @Column(name = "SCSS_YN")
    @Enumerated(EnumType.STRING)
    private YN successYN; // 체결여부

    @Builder
    public Order(String secompCode, String secompOrderNo, String itemName, String itemCode, String itemOptionCode, String orderPrice, String orderQuantity, String orderAmount, OrderType orderType) {
        this.secompCode = secompCode;
        this.secompOrderNo = secompOrderNo;
        this.itemName = itemName;
        this.itemCode = itemCode;
        this.itemOptionCode = itemOptionCode;
        this.orderPrice = orderPrice;
        this.orderQuantity = orderQuantity;
        this.orderAmount = orderAmount;
        this.orderType = orderType;
        this.cancelYN = YN.N;
        this.effectYN = YN.Y;
        this.successYN = YN.N;
    }

    public static Order of(OrderResponseDto orderResponseDto, OrderInfo orderInfo) {
        return Order.builder()
                .secompCode(orderResponseDto.getSecompCode())
                .secompOrderNo(orderResponseDto.getSecompOrderNo())
                .itemName(orderInfo.getItemName())
                .itemCode(orderInfo.getItemCode())
                .itemOptionCode(orderInfo.getOrderDivision())
                .orderPrice(orderInfo.getOrderPrice())
                .orderQuantity(orderInfo.getOrderQuantity())
                .orderAmount(orderInfo.getOrderAmount())
                .orderType(orderInfo.getOrderType())
                .build();
    }
}
