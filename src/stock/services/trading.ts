import { APP_KEY, APP_SECRET, URL_BASE } from "../../config/env";
import { Method } from "../enums/method";
import { OrderCashBody } from "../interfaces/trading";
import { OAuthService } from "./oauth";

const TR_ID_CASH_BUY = "VTTC0802U"; // 주식 현금 주문(실전): TTTC0802U

class TradingService {
    public oauthService: OAuthService;
    constructor() {
        this.oauthService = new OAuthService();
    }
    async order(access_token: string): Promise<void> {
        const method: string = Method.POST;
        const url: string = URL_BASE + "/uapi/domestic-stock/v1/trading/order-cash";

        const requestBody: OrderCashBody = {
            "CANO": "", // 종합계좌번호 앞 8자리
            "ACNT_PRDT_CD": "", // 뒤 2자리
            "PDNO": "", // 종목코드(6자리)
            "ORD_DVSN": "", // 00 지정가, 01 시장가, 02 조건부지정가
            "ORD_QTY": "", // 주문 수량
            "ORD_UNPR": "0", // 주문 단가
        };

        const requestHeaders: HeadersInit = new Headers();
        requestHeaders.append("authorization", `Bearer ${access_token}`);
        requestHeaders.append("appkey", APP_KEY);
        requestHeaders.append("appsecret", APP_SECRET);
        requestHeaders.append("tr_id", TR_ID_CASH_BUY);
        requestHeaders.append("hashkey", this.oauthService.hashkey(requestBody));
    }
}

export { TradingService };
