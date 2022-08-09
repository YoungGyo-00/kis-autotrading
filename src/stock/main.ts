import { Headers, HeadersInit } from "node-fetch";
import { URL_VTS, GRANT_TYPE, APP_SECRET, APP_KEY } from "../config/env";
import { OAuthService } from "./services/oauth";

const PATH: string = "/oauth2/tokenP";
const URL: string = URL_VTS + PATH;
const requestHeaders: HeadersInit = new Headers();
const requestBody: Object = {
    grant_type: GRANT_TYPE,
    appkey: APP_KEY,
    appsecret: APP_SECRET,
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
        const oAuthService = new OAuthService(URL, options);

        const access_token: String = await oAuthService.token();

        console.log(`Access_token : ${access_token}`);
    }

    async start() {}
}
