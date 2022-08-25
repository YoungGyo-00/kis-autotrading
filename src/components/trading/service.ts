import fetch, { Headers, HeadersInit, RequestInit } from "node-fetch";
import { APP_KEY, APP_SECRET, URL_BASE } from "../../config/env";
import { Method } from "../../config/enums/http-method";
import { ITradingService, OrderBody } from "./interface";
import { OAuthService } from "../oauth/service";

const TR_ID_INQUIRE_BALANCE = "TTTC8434R"; // 실전

class TradingService implements ITradingService {
    public oauthService: OAuthService;
    constructor() {
        this.oauthService = new OAuthService();
    }
    async order(access_token: string, tr_id: string): Promise<void> {
        const method: string = Method.POST;
        const url: string = URL_BASE + "/uapi/domestic-stock/v1/trading/order-cash";

        const requestBody: OrderBody = {
            "CANO": "20220804", // 종합계좌번호 앞 8자리
            "ACNT_PRDT_CD": "01", // 뒤 2자리
            "PDNO": "353200", // 종목코드(6자리)
            "ORD_DVSN": "01", // 00 지정가, 01 시장가, 02 조건부지정가
            "ORD_QTY": "1", // 주문 수량
            "ORD_UNPR": "1", // 주문 단가
        };

        const requestHeaders: HeadersInit = new Headers();
        requestHeaders.append("authorization", `Bearer ${access_token}`);
        requestHeaders.append("appkey", APP_KEY);
        requestHeaders.append("appsecret", APP_SECRET);
        requestHeaders.append("tr_id", tr_id); // 주식 현금 주문(실전): TTTC0802U, 주식 현금 매도 주문 : TTTC0801U
        requestHeaders.append("hashkey", await this.oauthService.hashkey(requestBody));

        const options: RequestInit = {
            method: method,
            headers: requestHeaders,
            body: JSON.stringify(requestBody),
        };

        const message: string = await fetch(url, options)
            .then(response => response.json())
            .catch(err => new Error(err));

        console.log(message);
    }

    async inquireBlanace(access_token: string): Promise<void> {
        const method: string = Method.POST;
        const url: string = URL_BASE + "/uapi/domestic-stock/v1/trading/inquire-balance?";

        const params: Signature = {
            "CANO": "68337050", // 계좌 앞 8자리
            "ACNT_PRDT_CD": "01", // 계좌 뒤 2자리
            "AFHR_FLPR_YN": "N",
            "OFL_YN": "",
            "INQR_DVSN": "1",
            "UNPR_DVSN": "02",
            "FUND_STTL_ICLD_YN": "N",
            "FNCG_AMT_AUTO_RDPT_YN": "N",
            "PRCS_DVSN": "01",
            "CTX_AREA_FK100": "",
            "CTX_AREA_NK100": "",
        };

        const query: string = Object.keys(params)
            .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(params[key]))
            .join("&");

        const requestHeaders: HeadersInit = new Headers();
        requestHeaders.append("authorization", `Bearer ${access_token}`);
        requestHeaders.append("appkey", APP_KEY);
        requestHeaders.append("appsecret", APP_SECRET);
        requestHeaders.append("tr_id", TR_ID_INQUIRE_BALANCE);

        const options: RequestInit = {
            method: method,
            headers: requestHeaders,
        };

        const data = await fetch(url + query, options)
            .then(response => response.json())
            .catch(err => new Error(err));

        console.log(data);
    }
}

export { TradingService };
