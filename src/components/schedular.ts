import Container from "typedi";
import schedule from "node-schedule";

import { CrawlerService } from "./crawler/crawlerService";
import { OAuthService } from "./oauth/oauthService";
import { QuotationsService } from "./quotations/quotationsService";
import { TickerDto } from "./crawler/dtos/tickerDto";
import { TradingService } from "./trading/tradingService";

export class Schedular {
    private access_token: string;
    private tickers: TickerDto[];
    private oauthService: OAuthService;
    private quotationsService: QuotationsService;
    private crawlerService: CrawlerService;
    private tradingService: TradingService;

    constructor() {
        this.oauthService = Container.get(OAuthService);
        this.quotationsService = Container.get(QuotationsService);
        this.crawlerService = Container.get(CrawlerService);
        this.tradingService = Container.get(TradingService);
        // 처음 시작할 때, 이전 30일 거래 정보 저장
        this.inquireDaily();
        this.schedular();
    }

    // 종목코드
    async getTicker(): Promise<void> {
        this.tickers = await this.crawlerService.getTicker();
    }

    // 토큰 생성
    async getToken(): Promise<void> {
        this.access_token = await this.oauthService.token();
    }

    // 토큰 삭제
    async revokeToken(): Promise<void> {
        await this.oauthService.revoke(this.access_token);
    }

    // 당일 주가 정보 저장
    async inquiryPrice(): Promise<void> {
        await this.quotationsService.inquirePrice(this.access_token, this.tickers);
    }

    // 30일 주가 정보 저장
    async inquireDaily(): Promise<void> {
        await this.getTicker();
        await this.getToken();
        await this.quotationsService.inquireDaily(this.access_token, this.tickers);
        await this.revokeToken();
    }

    async schedular() {
        // 국내 장 시작 시간 : 9시마다 티커 초기화, 접근 토큰 초기화
        schedule.scheduleJob({ hour: 9, dayOfWeek: [1, 2, 3, 4, 5] }, async () => {
            console.log("매주 월~금 9시에 토큰 활성화");
            await this.getTicker();
            await this.getToken();
        });

        // 주식 매도

        // 주식 매수

        // 하루 거래 정보 저장 : 18시마다 진행
        schedule.scheduleJob({ hour: 18, dayOfWeek: [1, 2, 3, 4, 5] }, async () => {
            console.log("매주 월~금 18시에 당일 주가 정보 저장");
            await this.inquiryPrice();
        });

        // 접근 토큰 비활성화 : 19시마다 진행
        schedule.scheduleJob({ hour: 19, dayOfWeek: [1, 2, 3, 4, 5] }, async () => {
            console.log("19시마다 접근 토큰 폐기");
            await this.revokeToken();
        });

        // 종목 선정(매수/매도), 백테스팅 진행 : 23시 진행
        schedule.scheduleJob({ hour: 23, dayOfWeek: [1, 2, 3, 4, 5] }, async () => {
            console.log("23시마다 매수/매도 종목 선정");
        });
    }
}
