import { Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

export class BaseInfoEntity {
    // 최초등록일시
    @CreateDateColumn({
        type: "timestamp",
        name: "FRST_REG_DT",
        default: () => "CURRENT_TIMESTAMP(6)",
    })
    frstRegDt: Date;

    // 최초등록사용자번호
    @Column({
        name: "FRST_REG_USR_NO",
        length: 10,
    })
    frstRegUsrNo: string;

    // 최종변경일시
    @UpdateDateColumn({
        type: "timestamp",
        name: "LASST_CHG_DT",
        default: () => "CURRENT_TIMESTAMP(6)",
        onUpdate: "CURRENT_TIMESTAMP(6)",
    })
    lastChgDt: Date;

    // 최종변경사용자번호
    @Column({
        name: "LAST_CHG_USR_NO",
        length: 10,
    })
    lastChgUsrNo: string;
}
