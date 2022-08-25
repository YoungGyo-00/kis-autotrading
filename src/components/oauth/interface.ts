export interface IOAuthService {
    hashkey(requestBody: Object): Promise<string>;
    token(): Promise<string>;
    revoke(access_token: string): Promise<void>;
}

export interface TokenBody {
    grant_type: string;
    appkey: string;
    appsecret: string;
}

export interface RevokeBody {
    appkey: string;
    appsecret: string;
    token: string; // 발급 받은 access_token
}
