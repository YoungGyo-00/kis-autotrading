package com.example.kisautotrading.domain.quotation.domain;

import com.example.kisautotrading.domain.quotation.dto.response.GetInquirePriceDto;
import com.example.kisautotrading.domain.quotation.vo.QuotationInfoVo;
import com.example.kisautotrading.global.common.entity.BaseTimeEntity;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

// 종목일자별주가이력 - 호가
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity(name = "ITM_DDBY_SHARPRC_HIST")
public class Quotation extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "TRD_DD")
    private String tradingDate; // 거래일자

    @Column(name = "ITM_CD")
    private String itemCode; // 종목코드

    @Column(name = "ITM_NM")
    private String itemName; // 종목명

    @Column(name = "STRC_PRC")
    private Long startPrice; // 시가

    @Column(name = "END_PRC")
    private Long endPrice; // 종가

    @Column(name = "TOP_PRICE")
    private Long topPrice; // 최고가

    @Column(name = "LWST_PRC")
    private Long lowestPrice; // 최저가

    @Column(name = "TOT_TRD_QNTY")
    private Long totalTradingQuantity; // 총거래

    @Builder
    public Quotation(String tradingDate, String itemCode, String itemName, Long startPrice, Long endPrice, Long topPrice, Long lowestPrice, Long totalTradingQuantity) {
        this.tradingDate = tradingDate;
        this.itemCode = itemCode;
        this.itemName = itemName;
        this.startPrice = startPrice;
        this.endPrice = endPrice;
        this.topPrice = topPrice;
        this.lowestPrice = lowestPrice;
        this.totalTradingQuantity = totalTradingQuantity;
    }

    public static Quotation of(QuotationInfoVo quotationInfoVo, GetInquirePriceDto getInquirePriceDto) {
        return Quotation.builder()
                .tradingDate(quotationInfoVo.getTradingDate())
                .itemCode(quotationInfoVo.getItemCode())
                .itemName(quotationInfoVo.getItemName())
                .startPrice(Long.parseLong(getInquirePriceDto.getStartPrice()))
                .endPrice(Long.parseLong(getInquirePriceDto.getEndPrice()))
                .topPrice(Long.parseLong(getInquirePriceDto.getTopPrice()))
                .lowestPrice(Long.parseLong(getInquirePriceDto.getLowestPrice()))
                .totalTradingQuantity(Long.parseLong(getInquirePriceDto.getTotalTradingQuantity()))
                .build();
    }
}
