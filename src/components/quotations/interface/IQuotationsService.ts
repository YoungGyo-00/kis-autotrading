import { TickerDto } from "@ticker";

export interface IQuotationsService {
    inquirePrice(access_token: string, tickers: TickerDto[]): Promise<void>; // 현재 주식 정보
    inquireDaily(access_token: string, tickers: TickerDto[]): Promise<void>; // 최근 30일 or 30주 or 30달 주식 정보
}
