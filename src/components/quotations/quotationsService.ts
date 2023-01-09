import fetch, { Headers, HeadersInit, RequestInit } from "node-fetch";

import { IQuotationsService } from "./interface/IQuotationsService";
import { APP_KEY, APP_SECRET, URL_BASE } from "@env";
import { Method } from "@method";

const TR_ID = "FHKST01010100"; // 현재 시세 조회
const TR_ID_DAILY = "FHKST01010400"; // 최근 시세 조회(30일)

class QuotationsService implements IQuotationsService {
    constructor() {}

    async inquirePrice(access_token: string): Promise<void> {
        const method: string = Method.GET;
        const url: string = URL_BASE + "/uapi/domestic-stock/v1/quotations/inquire-price?";

        const params: Signature = {
            "FID_COND_MRKT_DIV_CODE": "J", // FID 조건 시장 분류 코드
            "FID_INPUT_ISCD": "353200", // FID 입력 종목 코드
        };

        const query: string = Object.keys(params)
            .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(params[key]))
            .join("&");

        const requestHeaders: HeadersInit = new Headers();
        requestHeaders.append("authorization", `Bearer ${access_token}`);
        requestHeaders.append("appkey", APP_KEY);
        requestHeaders.append("appsecret", APP_SECRET);
        requestHeaders.append("tr_id", TR_ID);

        const options: RequestInit = {
            method: method,
            headers: requestHeaders,
        };

        const data = await fetch(url + query, options)
            .then(response => response.json())
            .catch(err => new Error(err));

        console.log(data);
    }

    async inquireDaily(access_token: string): Promise<void> {
        const method: string = Method.GET;
        const url: string = URL_BASE + "/uapi/domestic-stock/v1/quotations/inquire-daily-price?";

        let params: Signature = {
            "FID_COND_MRKT_DIV_CODE": "J", // FID 조건 시장 분류 코드
            "FID_INPUT_ISCD": "353200", // FID 입력 종목 코드
            "FID_PERIOD_DIV_CODE": "D", // D : 최근 30일, W : 최근 30주, M : 최근 30개월
            "FID_ORG_ADJ_PRC": "0", // 0 -> 수정 주가 반영, 1 -> 수정 주가 미반영
        };

        let query: string = Object.keys(params)
            .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(params[key]))
            .join("&");

        const requestHeaders: HeadersInit = new Headers();
        requestHeaders.append("authorization", `Bearer ${access_token}`);
        requestHeaders.append("appkey", APP_KEY);
        requestHeaders.append("appsecret", APP_SECRET);
        requestHeaders.append("tr_id", TR_ID_DAILY);

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

export { QuotationsService };