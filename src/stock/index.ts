import schedule from "node-schedule";

import { OAuthService } from "./services/oauth";
import { QuotationsService } from "./services/quotations";

export class Stock {
    public access_token: string;
    constructor() {
        this.init();
    }

    async init() {
        const oauthService = new OAuthService();
        const quotationsService = new QuotationsService();

        // 국내 장 시작 시간 : 9시마다 접근 토큰 초기화, 15시 30분 접근 폐기
        // schedule.scheduleJob({ rule: "* * * * * *" }, async () => {
        //
        // });

        this.access_token = await oauthService.token();

        console.log(`Access_token : ${this.access_token}`);

        // await quotationsService.inquireDaily(this.access_token); // 주식 현재 정보 조회
        await oauthService.revoke(this.access_token); // 토큰 폐기
    }
}
