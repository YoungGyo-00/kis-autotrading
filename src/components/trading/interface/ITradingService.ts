export interface ITradingService {
    order(access_token: string, tr_id: string): Promise<void>; // 주식 현금 주문
    inquireBlanace(access_token: string): Promise<void>; // 현재 잔고 상태
}

export interface OrderBody {
    CANO: string; // 종합계좌번호 앞 8자리
    ACNT_PRDT_CD: string; // 뒤 2자리
    PDNO: string; // 종목코드(6자리)
    ORD_DVSN: string; // 00 지정가, 01 시장가, 02 조건부지정가
    ORD_QTY: string; // 주문 수량
    ORD_UNPR: string; // 주문 단가
}
