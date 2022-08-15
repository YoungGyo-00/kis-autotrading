import fetch, { Headers, HeadersInit, RequestInit, Response } from "node-fetch";

import { APP_KEY, APP_SECRET, URL_BASE } from "../../config/env";
import { Method } from "../enums/method";

const TR_ID = "FHKST01010100";

class QuotationsService {
    constructor() {}

    async inquire(access_token: string): Promise<void> {
        const method: string = Method.GET;
        const url: string = URL_BASE + "/uapi/domestic-stock/v1/quotations/inquire-price?";

        let params: Signature = {
            "FID_COND_MRKT_DIV_CODE": "J", // FID 조건 시장 분류 코드
            "FID_INPUT_ISCD": "353200", // FID 입력 종목 코드
        };

        let query: string = Object.keys(params)
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

        // console.log(`data : ${data}`);
        console.log(data);
    }
}

export { QuotationsService };
