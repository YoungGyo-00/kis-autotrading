import axios, { AxiosResponse } from "axios";
import cheerio from "cheerio";
import { Service } from "typedi";
import { TickerDto } from "./dtos";

import { ICrawlerService } from "./interface/ICrawlerService";

@Service()
export class CrawlerService implements ICrawlerService {
    constructor() {}

    // basic html 불러오기
    async getBasicHtml(url: string, header?: Object): Promise<CheerioRoot> {
        try {
            const html = await axios.post(url, { header: header });

            return cheerio.load(html.data);
        } catch (err) {
            console.error(err);
            throw new Error("CrawlerService getBasicHtml 에러");
        }
    }

    // html 한글 패치 불러오기
    async getPatchHtml(url: string, header?: Object): Promise<CheerioRoot> {
        try {
            const req: AxiosResponse<ArrayBuffer> = await axios.get(url, {
                responseType: "arraybuffer", // 서버에서 응답할 데이터 타입을 설정
                responseEncoding: "binary", // 응답 디코딩에 사용할 인코딩
            });
            const html: ArrayBuffer = req.data;

            const decoder: TextDecoder = new TextDecoder("euc-kr"); // 한글 깨짐 현상 복구
            const content: string = decoder.decode(html);

            // console.log(content);

            return cheerio.load(content);
        } catch (err: any) {
            console.error(err);
            throw new Error("CrawlerService getHtml 에러");
        }
    }

    // 종목코드, 종목명 조회
    async getTicker(): Promise<TickerDto[]> {
        const tickers: TickerDto[] = [];

        for (let sosok = 0; sosok <= 1; sosok++) {
            const url: string = `https://finance.naver.com/sise/sise_market_sum.naver?sosok=${sosok}`;
            const $: CheerioRoot = await this.getPatchHtml(url);

            const elementOfPage = $("td.pgRR a").attr("href") as string;
            const positionOfPage: number = elementOfPage.indexOf("page=");

            const endPage: number = Number(elementOfPage.slice(positionOfPage + 5, positionOfPage + 7));

            for (let page = 1; page <= endPage; page++) {
                const url: string = `https://finance.naver.com/sise/sise_market_sum.naver?sosok=${sosok}&page=${page}`;
                const $: CheerioRoot = await this.getPatchHtml(url);

                const elements: Cheerio = $("div.box_type_l table tbody tr td:nth-child(2) a");

                elements.each((index: number, tag: Tag) => {
                    const elementOfTicker: string = $(tag).attr("href") as string;

                    const positionOfTicker: number = elementOfTicker.indexOf("code=");

                    if (positionOfTicker != -1) {
                        const itemCode: string = elementOfTicker.slice(positionOfTicker + 5, positionOfTicker + 11);
                        const itemName: string = $(tag).text();

                        console.log(tickers.length + 1 + "| " + itemCode + " | " + itemName);

                        const ticker: TickerDto = new TickerDto(itemCode, itemName);

                        tickers.push(ticker);
                    }
                });
            }
        }

        return tickers;
    }
}
