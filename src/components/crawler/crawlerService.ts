import axios, { AxiosResponse } from "axios";
import cheerio from "cheerio";
import { Service } from "typedi";

import { ICrawlerService } from "./interface/ICrawlerService";

@Service()
export class CrawlerService implements ICrawlerService {
    constructor() {}

    // basic html 불러오기
    async getBasicHtml(url: string, header?: Object): Promise<CheerioRoot> {
        try {
            const html = await axios.post(url, { header: header });

            console.log(html);
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

            return cheerio.load(content);
        } catch (err: any) {
            console.error(err);
            throw new Error("CrawlerService getHtml 에러");
        }
    }
}
