import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { BaseInfoEntity } from "./base/BaseInfoEntity";
import { OrderList } from "./OrderList";

// 주문취소내역
@Entity("ORD_CNCL_DLST")
export class OrderCancel extends BaseEntity {
    // FK
    @OneToOne(type => OrderList, orderList => orderList.getOrderCancel, { lazy: true })
    @JoinColumn([{ name: "SECOMP_ORD_NO", referencedColumnName: "secompOrderNo" }])
    private orderList: OrderList;

    // PK
    @PrimaryGeneratedColumn()
    private id: number;

    // 취소증권사주문번호
    @Column({
        name: "CNCL_SECOMP_ORD_NO",
        length: 20,
    })
    private cancelSecompOrderNo: string;

    // 공통정보
    @Column((type: any) => BaseInfoEntity)
    private baseInfo: BaseInfoEntity;

    public static createOrderCancel = (orderList: OrderList, cancelSecompOrderNo: string): OrderCancel => {
        const orderCancel: OrderCancel = new OrderCancel();

        orderCancel.orderList = orderList;
        orderCancel.cancelSecompOrderNo = cancelSecompOrderNo;

        return orderCancel;
    };

    public getOrderList = () => {
        return this.orderList;
    };
}
