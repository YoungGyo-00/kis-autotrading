import Container from "typedi";

import { OAuthService } from "./oauth/oauthService";

export class Schedular {
    private access_token: string;
    private oauthService: OAuthService;

    constructor() {
        this.oauthService = Container.get(OAuthService);
        this.schedular();
    }

    // 토큰 생성
    async getToken() {
        this.access_token = await this.oauthService.token();
    }

    // 토큰 삭제
    async revokeToken() {
        await this.oauthService.revoke(this.access_token);
    }

    async schedular() {
        // await this.getToken();
        // await this.revokeToken();
        // 국내 장 시작 시간 : 9시마다 접근 토큰 초기화, 15시 30분 접근 폐기
        // schedule.scheduleJob({ rule: "* * * * * *" }, async () => {});
    }
}
