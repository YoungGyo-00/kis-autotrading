import schedule from "node-schedule";

import { OAuthService } from "./services/oauth";

export class Stock {
    public access_token: string;
    constructor() {
        this.init();
    }

    async init() {
        const oAuthService = new OAuthService();

        // 국내 장 시작 시간 : 9시마다 접근 토큰 초기화, 15시 30분 접근 폐기
        // schedule.scheduleJob({ rule: "* * * * * *" }, async () => {
        //
        // });

        this.access_token = await oAuthService.token();

        console.log(`Access_token : ${this.access_token}`);

        await oAuthService.revoke(this.access_token);
    }
}
