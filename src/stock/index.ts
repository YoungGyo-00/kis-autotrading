import schedule from "node-schedule";

import { OAuthService } from "./services/oauth";

export class Stock {
    constructor() {
        this.init();
    }

    async init() {
        const oAuthService = new OAuthService();

        // 국내 장 시작 시간 : 9시마다 초기화
        // schedule.scheduleJob({ rule: "* * * * * *" }, async () => {
        //     const access_token: String = await oAuthService.token();

        //     console.log(`Access_token : ${access_token}`);
        // });

        const access_token: string = await oAuthService.token();

        console.log(`Access_token : ${access_token}`);

        await oAuthService.revoke(access_token);
    }
}
