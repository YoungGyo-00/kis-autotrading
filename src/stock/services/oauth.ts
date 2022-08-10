import fetch, { Headers, HeadersInit } from "node-fetch";

import { URL_BASE, GRANT_TYPE, APP_SECRET, APP_KEY } from "../../config/env";

class OAuthService {
    constructor() {}

    async token(): Promise<string> {
        const url: string = URL_BASE + "/oauth2/tokenP";

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

        const options: Option = {
            method: "POST",
            headers: requestHeaders,
            body: JSON.stringify(requestBody),
        };

        await fetch(url, options)
            .then(response => response.json())
            .then(data => console.log(`Message(Code: ${data.code}) : ${data.message}`))
            .catch(err => new Error(err));
    }

    // async hash(): Promise<String> {
    //     const response = await fetch()
    // }
}

export { OAuthService };
