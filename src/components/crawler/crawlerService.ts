import axios, { AxiosResponse } from "axios";
import cheerio from "cheerio";
import { Service } from "typedi";

import { ICrawlerService } from "./interface/ICrawlerService";

@Service()
export class CrawlerService implements ICrawlerService {
    constructor() {}

    // html 불러오기
    async getHtml(url: string) {
        try {
            const req: AxiosResponse<ArrayBuffer> = await axios.get(url, {
                responseType: "arraybuffer", // 서버에서 응답할 데이터 타입을 설정
                responseEncoding: "binary", // 응답 디코딩에 사용할 인코딩
            });
            const html: ArrayBuffer = req.data;

            const decoder: TextDecoder = new TextDecoder("euc-kr"); // 한글 깨짐 현상 복구
            const content: string = decoder.decode(html);

            return cheerio.load(content);
        } catch (err) {
            console.error(err);

            throw new Error("CrawlerService getHtml 에러");
        }
    }

    async test() {
        const $ = await this.getHtml("https://finance.naver.com/item/main.naver?code=353200");

        const contents = $("div.rate_info table tbody tr td").children("span");

        console.log(contents.length);

        contents.each((index, element) => {
            console.log(index + " : " + $(element).text());
        });
    }
}
