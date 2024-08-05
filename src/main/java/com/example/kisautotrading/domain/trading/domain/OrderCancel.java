package com.example.kisautotrading.domain.trading.domain;

import com.example.kisautotrading.global.common.entity.BaseTimeEntity;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

// 주문취소내역
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity(name = "ORD_CNCL_LST")
public class OrderCancel extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id", nullable = false)
    private Order order;

    @Column(name = "CNCL_SECOMP_ORD_NO")
    private String cancelSecompOrderNo; // 취소증권사주문번호

    @Builder
    public OrderCancel(Order order, String cancelSecompOrderNo) {
        this.order = order;
        this.cancelSecompOrderNo = cancelSecompOrderNo;
    }
}
