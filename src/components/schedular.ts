import Container from "typedi";
import { CrawlerService } from "./crawler/crawlerService";
import { TickerDto } from "./crawler/dtos/tickerDto";

import { OAuthService } from "./oauth/oauthService";
import { QuotationsService } from "./quotations/quotationsService";

export class Schedular {
    private access_token: string;
    private oauthService: OAuthService;
    private quotationsService: QuotationsService;
    private crawlerService: CrawlerService;

    constructor() {
        this.oauthService = Container.get(OAuthService);
        this.quotationsService = Container.get(QuotationsService);
        this.crawlerService = Container.get(CrawlerService);
        this.schedular();
    }

    // 토큰 생성
    async getToken(): Promise<void> {
        this.access_token = await this.oauthService.token();
    }

    // 토큰 삭제
    async revokeToken(): Promise<void> {
        await this.oauthService.revoke(this.access_token);
    }

    // 당일 주가 정보 저장 -> 4시마다 스케쥴링
    async inquiryPrice(tickers: TickerDto[]): Promise<void> {
        await this.quotationsService.inquirePrice(this.access_token, tickers);
    }

    // 30일 주가 정보 저장
    async inquireDaily(tickers: TickerDto[]): Promise<void> {
        await this.quotationsService.inquireDaily(this.access_token, tickers);
    }

    async getTicker(): Promise<TickerDto[]> {
        return await this.crawlerService.getTicker();
    }

    async schedular() {
        const tickers: TickerDto[] = await this.getTicker();
        // console.log(tickers);
        // await this.getToken();
        // await this.inquireDaily(tickers);
        // await this.inquiryPrice(tickers);
        // await this.revokeToken();
        // 국내 장 시작 시간 : 9시마다 접근 토큰 초기화, 15시 30분 접근 폐기
        // schedule.scheduleJob({ rule: "* * * * * *" }, async () => {});
    }
}
