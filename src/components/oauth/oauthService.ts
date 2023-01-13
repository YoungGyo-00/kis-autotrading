import { Service } from "typedi";
import { AxiosHeaders, AxiosResponse } from "axios";

import { APP_SECRET, APP_KEY, BASE_URL } from "@env";
import client from "@axios";
import { RevokeBody, TokenBody } from "./interface/IOAuthService";

@Service()
export class OAuthService implements OAuthService {
    constructor() {}

    async hashkey(body: Object): Promise<string> {
        const requestHeaders: AxiosHeaders = new AxiosHeaders({
            "Content-Type": "applicaation/json",
            "appkey": APP_KEY,
            "appsecret": APP_SECRET,
        });

        const hashkey: string = await client
            .post("/uapi/hashkey", body, { headers: requestHeaders })
            .then((response: AxiosResponse) => {
                console.log(`HASHKEY 생성\nMessage(Code: ${response.status}) : ${response.statusText}`);
                return response.data.HASH;
            })
            .catch((err: any) => {
                console.error(err);
                throw new Error("oauthService hashkey error");
            });

        return hashkey;
    }

    // 접근토큰발급(P)
    async token(): Promise<string> {
        const requestHeaders: AxiosHeaders = new AxiosHeaders();

        const body: TokenBody = {
            "grant_type": "client_credentials",
            "appkey": APP_KEY,
            "appsecret": APP_SECRET,
        };

        const access_token: string = await client
            .post("/oauth2/tokenP", body, { headers: requestHeaders })
            .then((response: AxiosResponse) => {
                console.log(`토큰 생성\nMessage(Code: ${response.status}) : ${response.statusText}`);
                return response.data.access_token;
            })
            .catch((err: any) => {
                console.error(err);
                throw new Error("oauthService token error");
            });

        return access_token;
    }

    // 접근토큰폐기(P)
    async revoke(access_token: string): Promise<void> {
        const requestHeaders: AxiosHeaders = new AxiosHeaders();

        const body: RevokeBody = {
            "appkey": APP_KEY,
            "appsecret": APP_SECRET,
            "token": access_token,
        };

        await client
            .post("/oauth2/revokeP", body, { headers: requestHeaders })
            .then((response: AxiosResponse) => {
                console.log(`토큰 비활성화\nMessage(Code: ${response.status}) : ${response.statusText}`);
            })
            .catch((err: any) => {
                console.error(err);
                throw new Error("oauthService revoke error");
            });
    }
}
