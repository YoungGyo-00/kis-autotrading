import { BaseEntity, Column, Entity, PrimaryColumn } from "typeorm";

// 종목일자별주가이력 - 호가
@Entity("ITM_DDBY_SHARPRC_HIST")
export class Quotations extends BaseEntity {
    // 거래일자
    @PrimaryColumn({
        name: "TRD_DD",
        nullable: false,
        length: 8,
    })
    private tradingDate: string;

    // 종목코드
    @PrimaryColumn({
        name: "ITM_CD",
        nullable: false,
        length: 6,
    })
    private itemCode: string;

    // 종목명
    @Column({
        name: "ITM_NM",
        length: 6,
    })
    private itemName: string;

    // 시작가격
    @Column({
        name: "STRT_PRC",
    })
    private startPrice: number;

    // 종료가격
    @Column({
        name: "END_PRC",
    })
    private endPrice: number;

    // 최고가격
    @Column({
        name: "TOP_PRICE",
    })
    private topPrice: number;

    // 최저가격
    @Column({
        name: "LWST_PRC",
    })
    private lowestPrice: number;

    // 총거래량
    @Column({
        name: "TOT_TRD_QNTY",
    })
    private totalTradingQuntity: number;

    // 공통정보
    @Column((type: any) => BaseEntity)
    private baseEntity: BaseEntity;

    public static createStockHistory = (
        tradingDate: string,
        itemCode: string,
        itemName: string,
        startPrice: number,
        endPrice: number,
        topPrice: number,
        lowestPrice: number,
        totalTradingQuntity: number,
    ): Quotations => {
        const quotation: Quotations = new Quotations();

        quotation.tradingDate = tradingDate;
        quotation.itemCode = itemCode;
        quotation.itemName = itemName;
        quotation.startPrice = startPrice;
        quotation.endPrice = endPrice;
        quotation.topPrice = topPrice;
        quotation.lowestPrice = lowestPrice;
        quotation.totalTradingQuntity = totalTradingQuntity;

        return quotation;
    };
}
