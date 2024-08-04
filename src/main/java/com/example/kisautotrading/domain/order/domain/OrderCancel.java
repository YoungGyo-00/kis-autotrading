package com.example.kisautotrading.domain.order.domain;

import com.example.kisautotrading.global.common.entity.BaseTimeEntity;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

// 주문취소내역
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity(name = "ORD_CNCL_DLST")
public class OrderCancel extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_list_id", nullable = false)
    private OrderList orderList;

    @Column(name = "CNCL_SECOMP_ORD_NO")
    private String cancelSecompOrderNo; // 취소증권사주문번호

    @Builder
    public OrderCancel(OrderList orderList, String cancelSecompOrderNo) {
        this.orderList = orderList;
        this.cancelSecompOrderNo = cancelSecompOrderNo;
    }
}
