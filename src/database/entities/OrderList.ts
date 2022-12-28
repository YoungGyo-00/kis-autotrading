import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";

import { Order } from "./Order";

// 주문내역
@Entity("ORD_DIST")
export class OrderList extends BaseEntity {
    // 거래일자, 주문 순번 복합키 FK
    @ManyToOne(type => Order, order => order.getOrderLists, { lazy: true })
    @JoinColumn([
        { name: "TRD_DD", referencedColumnName: "tradingDate" },
        { name: "ORD_SEQ", referencedColumnName: "orderSequence" },
    ])
    private order: Order;

    // 증권사주문번호
    @PrimaryColumn({
        name: "SECOMP_ORD_NO",
        length: 20,
    })
    private secompOrderNo: string;

    // 종목코드
    @Column({
        name: "ITM_CD",
        length: 6,
    })
    private itemCode: string;

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

    // 체결가격
    @Column({
        name: "TRDNG_PRC",
    })
    private tradingPrice: number;

    // 체결량
    @Column({
        name: "TRDNG_QNTY",
    })
    private tradingQuantity: number;

    // 거래금액
    @Column({
        name: "TRD_AMT",
    })
    private tradingAmount: number;

    // 체결여부
    @Column({
        type: "char",
        name: "SCSS_YN",
        length: 1,
    })
    private successYN: string;

    // 공통정보
    @Column((type: any) => BaseEntity)
    private baseEntity: BaseEntity;

    public static createOrder = (
        order: Order,
        secompOrderNo: string,
        itemCode: string,
        itemOptionCode: string,
        orderPrice: number,
        tradingPrice: number,
        tradingQuantity: number,
        tradingAmount: number,
        successYN: string,
    ): OrderList => {
        const orderList: OrderList = new OrderList();

        orderList.order = order;
        orderList.secompOrderNo = secompOrderNo;
        orderList.itemCode = itemCode;
        orderList.itemOptionCode = itemOptionCode;
        orderList.orderPrice = orderPrice;
        orderList.tradingPrice = tradingPrice;
        orderList.tradingQuantity = tradingQuantity;
        orderList.tradingAmount = tradingAmount;
        orderList.successYN = successYN;

        return orderList;
    };

    public getOrder = () => {
        return this.order;
    };
}
