import { Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

export class BaseEntity {
    // 최초등록일시
    @CreateDateColumn({
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP(6)",
    })
    frstRegDt: Date;

    // 최초등록사용자번호
    @Column({
        length: 10,
    })
    frstRegUsrNo: string;

    // 최종변경일시
    @UpdateDateColumn({
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP(6)",
        onUpdate: "CURRENT_TIMESTAMP(6)",
    })
    lastChgDt: Date;

    // 최종변경사용자번호
    @Column({
        length: 10,
    })
    lastChgUsrNo: string;
}
