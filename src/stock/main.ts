import { Headers, HeadersInit } from "node-fetch";
import { GRANT_TYPE, APPSECRET, APPKEY } from "../config/env";
import { OAuthService } from "./services/oauth";

const url: string = "https://openapivts.koreainvestment.com:29443/oauth2/tokenP";
const requestHeaders: HeadersInit = new Headers();
const requestBody: Object = {
    grant_type: GRANT_TYPE,
    appkey: APPKEY,
    appsecret: APPSECRET,
};
const options: Option = {
    method: "POST",
    headers: requestHeaders,
    body: JSON.stringify(requestBody),
};

export class Stock {
    constructor() {
        this.init();
    }

    async init() {
        const oAuthService = new OAuthService(url, options);

        const access_token: String = await oAuthService.token();

        console.log(`Access_token : ${access_token}`);
    }

    async start() {}
}
