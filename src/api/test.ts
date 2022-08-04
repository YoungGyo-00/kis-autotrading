import fetch, { Headers, HeadersInit } from "node-fetch";
import { GRANT_TYPE, APPSECRET, APPKEY } from "../config/env";

const url = "https://openapivts.koreainvestment.com:29443/oauth2/tokenP";
const requestHeaders: HeadersInit = new Headers();
const requestBody = {
    grant_type: GRANT_TYPE,
    appkey: APPKEY,
    appsecret: APPSECRET,
};

export default async () => {
    const response = await fetch(url, {
        method: "POST",
        headers: requestHeaders,
        body: JSON.stringify(requestBody),
    });

    response.json().then(data => console.log(data));
};
