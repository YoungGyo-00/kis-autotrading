import { TickerDto } from "../dtos";

export interface ICrawlerService {
    getBasicHtml(url: string, header?: Object): Promise<CheerioRoot>;
    getPatchHtml(url: string, header?: Object): Promise<CheerioRoot>;
    getTicker(): Promise<TickerDto[]>;
}
