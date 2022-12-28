import { BaseEntity, Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { OrderList } from "./OrderList";

// 주문설정기본
@Entity("ORD_STNG_DLST")
export class Order extends BaseEntity {
    // 거래일자
    @PrimaryColumn({
        name: "TRD_DD",
        nullable: false,
        length: 8,
    })
    private tradingDate: string;

    // 주문순번
    @PrimaryColumn({
        name: "ORD_SEQ",
        nullable: false,
    })
    private orderSequence: number;

    // 사용자번호
    @Column({
        name: "USR_NO",
        length: 10,
    })
    private userNo: string;

    // 증권사코드
    @Column({
        type: "char",
        name: "SECOMP_CD",
        length: 3,
    })
    private secompCode: string;

    // 종목코드
    @Column({
        name: "ITM_CD",
        length: 6,
    })
    private itemCode: string;

    // 매수여부
    @Column({
        type: "char",
        name: "BUY_YN",
        length: 1,
    })
    private buyYN: string;

    // 주문옵션코드
    @Column({
        type: "char",
        name: "ITM_OPT_CD",
        length: 2,
    })
    private itemOptionCode: string;

    // 주문가격
    @Column({
        name: "ORD_PRC",
    })
    private orderPrice: number;

    // 주문시작시분
    @Column({
        name: "ORD_STRT_HHMM",
        length: 4,
    })
    private orderStartHHMM: string;

    // 주문량
    @Column({
        name: "ORD_QNTY",
    })
    private orderQuantity: number;

    // 총체결량
    @Column({
        name: "TOT_TRDNG_QNTY",
    })
    private totalTradingQuantity: number;

    // 총거래금액
    @Column({
        name: "TOT_TRD_AMT",
    })
    private totalTradingAmount: number;

    // 취소여부
    @Column({
        type: "char",
        name: "CNCL_YN",
        length: 1,
    })
    private cancelYN: string;

    // 유효여부
    @Column({
        type: "char",
        name: "EFF_YN",
        length: 1,
    })
    private effectYN: string;

    // 공통정보
    @Column((type: any) => BaseEntity)
    private baseEntity: BaseEntity;

    @OneToMany(type => OrderList, orderlist => orderlist.getOrder)
    private orderLists: OrderList[];

    public static createOrder = (
        tradingDate: string,
        orderSequence: number,
        userNo: string,
        secompCode: string,
        itemCode: string,
        buyYN: string,
        itemOptionCode: string,
        orderPrice: number,
        orderStartHHMM: string,
        orderQuantity: number,
        totalTradingQuantity: number,
        totalTradingAmount: number,
        cancelYN: string,
        effectYN: string,
    ): Order => {
        const order: Order = new Order();

        order.tradingDate = tradingDate;
        order.orderSequence = orderSequence;
        order.userNo = userNo;
        order.secompCode = secompCode;
        order.itemCode = itemCode;
        order.buyYN = buyYN;
        order.itemOptionCode = itemOptionCode;
        order.orderPrice = orderPrice;
        order.orderStartHHMM = orderStartHHMM;
        order.orderQuantity = orderQuantity;
        order.totalTradingQuantity = totalTradingQuantity;
        order.totalTradingAmount = totalTradingAmount;
        order.cancelYN = cancelYN;
        order.effectYN = effectYN;

        return order;
    };

    public getOrderLists = () => {
        return this.orderLists;
    };
}
