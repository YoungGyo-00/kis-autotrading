export interface TokenBody {
    grant_type: string;
    appkey: string;
    appsecret: string;
}

export interface RevokeBody {
    appkey: string;
    appsecret: string;
    token: string;
}
