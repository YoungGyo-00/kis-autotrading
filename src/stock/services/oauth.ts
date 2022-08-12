import fetch, { Headers, HeadersInit, RequestInit } from "node-fetch";

import { URL_BASE, GRANT_TYPE, APP_SECRET, APP_KEY } from "../../config/env";

class OAuthService {
    constructor() {}

    async hashkey(requestBody: Object): Promise<string> {
        const url: string = URL_BASE + "/uapi/hashkey";

        const requestHeaders: HeadersInit = new Headers();
        requestHeaders.append("Content-Type", "application/json");
        requestHeaders.append("appkey", APP_KEY);
        requestHeaders.append("appsecret", APP_SECRET);

        const options: RequestInit = {
            method: "POST",
            headers: requestHeaders,
            body: JSON.stringify(requestBody),
        };

        const hashkey: string = await fetch(url, options)
            .then(response => response.json())
            .then(data => {
                return data.HASH;
            })
            .catch(err => new Error(err));

        return hashkey;
    }

    async token(): Promise<string> {
        const url: string = URL_BASE + "/oauth2/tokenP";

        const requestHeaders: HeadersInit = new Headers();
        const requestBody: Object = {
            grant_type: GRANT_TYPE,
            appkey: APP_KEY,
            appsecret: APP_SECRET,
        };

        const options: RequestInit = {
            method: "POST",
            headers: requestHeaders,
            body: JSON.stringify(requestBody),
        };

        const access_token: string = await fetch(url, options)
            .then(response => response.json())
            .then(data => {
                return data.access_token;
            })
            .catch(err => new Error(err));

        return access_token;
    }

    async revoke(access_token: string): Promise<void> {
        const url: string = URL_BASE + "/oauth2/revokeP";

        const requestHeaders: HeadersInit = new Headers();
        const requestBody: Object = {
            appkey: APP_KEY,
            appsecret: APP_SECRET,
            token: access_token,
        };

        const options: RequestInit = {
            method: "POST",
            headers: requestHeaders,
            body: JSON.stringify(requestBody),
        };

        await fetch(url, options)
            .then(response => response.json())
            .then(data => console.log(`Message(Code: ${data.code}) : ${data.message}`))
            .catch(err => new Error(err));
    }
}

export { OAuthService };
