import schedule from "node-schedule";

import { OAuthService } from "./oauth/oauthService";
import { QuotationsService } from "./quotations/quotationsService";
import { TradingService } from "./trading/tradingService";

export class Stock {
    public access_token: string;
    constructor() {
        this.init();
    }

    async init() {
        const oauthService = new OAuthService();
        // const quotationsService = new QuotationsService();
        // const tradingService = new TradingService();

        // 국내 장 시작 시간 : 9시마다 접근 토큰 초기화, 15시 30분 접근 폐기
        // schedule.scheduleJob({ rule: "* * * * * *" }, async () => {
        //
        // });

        // this.access_token = await oauthService.token();

        // console.log(`Access_token : ${this.access_token}`);

        // await tradingService.inquireBlanace(this.access_token); // 주식 잔고 조회
        // await tradingService.order(this.access_token); // 주식 주문
        // await quotationsService.inquireDaily(this.access_token); // 주식 현재 정보 조회
        // await oauthService.revoke(this.access_token); // 토큰 폐기
    }
}
