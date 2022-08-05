import { Headers, HeadersInit } from "node-fetch";
import { GRANT_TYPE, APPSECRET, APPKEY } from "../config/env";
import { KisController } from "./kisController";

const url: string = "https://openapivts.koreainvestment.com:29443/oauth2/tokenP";
const requestHeaders: HeadersInit = new Headers();
const requestBody: Object = {
    grant_type: GRANT_TYPE,
    appkey: APPKEY,
    appsecret: APPSECRET,
};
const options: Object = {
    method: "POST",
    headers: requestHeaders,
    body: JSON.stringify(requestBody),
};

export class Stock {
    constructor() {
        this.init();
    }

    async init() {
        const kisController = new KisController(url, options);

        await kisController.start();
    }

    async start() {}
}
