package com.example.kisautotrading.domain.order.domain;

import com.example.kisautotrading.global.common.entity.BaseTimeEntity;
import com.example.kisautotrading.global.common.entity.YN;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

// 주문설정기본
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity(name = "ORD_STNG_DLST")
public class Order extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToMany(mappedBy = "order")
    private List<OrderList> orderLists = new ArrayList<>();

    @Column(name = "TRD_DD")
    private String tradingDate; // 거래일자

    @Column(name = "ORD_SEQ")
    private Long orderSequence; // 주문순번

    @Column(name = "USR_NO")
    private String userNo; // 사용자번호

    @Column(name = "SECOMP_CD")
    private String secompCode; // 증권사코드

    @Column(name = "ITM_CD")
    private String itemCode; // 종목코드

    @Column(name = "BUY_YN")
    @Enumerated(EnumType.STRING)
    private YN buyYN; // 매수여부

    @Column(name = "ITM_OPT_CD")
    private String itemOptionCode; // 주문옵션코드

    @Column(name = "ORD_RPC")
    private Long orderPrice; // 주문가격

    @Column(name = "ORD_STRT_HHMM")
    private String orderStartHHMM; // 주문시작시간

    @Column(name = "ORD_QNTY")
    private Long orderQuantity; // 주문량

    @Column(name = "TOT_TRDNG_QNTY")
    private Long totalTradingQuantity; // 총체결량

    @Column(name = "TOT_TRD_AMT")
    private Long totalTradingAmount; // 총거래금액

    @Column(name = "CNCL_YN")
    @Enumerated(EnumType.STRING)
    private YN cancelYN; // 취소여부

    @Column(name = "EFF_YN")
    @Enumerated(EnumType.STRING)
    private YN effectYN; // 유효여

    @Builder
    public Order(String tradingDate, Long orderSequence, String userNo, String secompCode, String itemCode, YN buyYN, String itemOptionCode, Long orderPrice, String orderStartHHMM, Long orderQuantity, Long totalTradingQuantity, Long totalTradingAmount, YN cancelYN, YN effectYN) {
        this.tradingDate = tradingDate;
        this.orderSequence = orderSequence;
        this.userNo = userNo;
        this.secompCode = secompCode;
        this.itemCode = itemCode;
        this.buyYN = buyYN;
        this.itemOptionCode = itemOptionCode;
        this.orderPrice = orderPrice;
        this.orderStartHHMM = orderStartHHMM;
        this.orderQuantity = orderQuantity;
        this.totalTradingQuantity = totalTradingQuantity;
        this.totalTradingAmount = totalTradingAmount;
        this.cancelYN = cancelYN;
        this.effectYN = effectYN;
    }
}
