import { BaseEntity, Column, Entity, PrimaryColumn } from "typeorm";

// 종목일자별주가이력
@Entity("ITM_DDBY_SHARPRC_HIST")
export class StockHistory extends BaseEntity {
    // 거래일자
    @PrimaryColumn({
        name: "TRD_DD",
        nullable: false,
        length: 8,
    })
    tradingDate: string;

    // 종목코드
    @PrimaryColumn({
        name: "ITM_CD",
        nullable: false,
        length: 6,
    })
    itemCode: string;

    // 종목명
    @Column({
        name: "ITM_NM",
        length: 6,
    })
    itemName: string;

    // 시작가격
    @Column({
        name: "STRT_PRC",
    })
    startPrice: number;

    // 종료가격
    @Column({
        name: "END_PRC",
    })
    endPrice: number;

    // 최고가격
    @Column({
        name: "TOP_PRICE",
    })
    topPrice: number;

    // 최저가격
    @Column({
        name: "LWST_PRC",
    })
    lowestPrice: number;

    // 총거래량
    @Column({
        name: "TOT_TRD_QNTY",
    })
    totalTradingQuntity: number;

    // 공통정보
    baseEntity: BaseEntity;
}
