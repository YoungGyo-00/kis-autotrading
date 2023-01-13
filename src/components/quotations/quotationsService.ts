import { Service } from "typedi";

import { IQuotationsService } from "./interface/IQuotationsService";
import { APP_KEY, APP_SECRET } from "@env";
import { AxiosHeaders, AxiosResponse } from "axios";
import client from "@axios";
import { TickerDto } from "@ticker";
import { Quotations, QuotationsRepository } from "./quotationsRepository";

const TR_ID = "FHKST01010100"; // 현재 시세 조회
const TR_ID_DAILY = "FHKST01010400"; // 최근 시세 조회(30일)

@Service()
export class QuotationsService implements IQuotationsService {
    constructor(private quotationRepository: QuotationsRepository) {}

    // 당일 주가정보 저장
    async inquirePrice(access_token: string, tickers: TickerDto[]): Promise<void> {
        const requestHeaders: AxiosHeaders = new AxiosHeaders({
            "authorization": `Bearer ${access_token}`,
            "appkey": APP_KEY,
            "appsecret": APP_SECRET,
            "tr_id": TR_ID,
        });

        for (const ticker of tickers) {
            const params: Signature = {
                "FID_COND_MRKT_DIV_CODE": "J", // FID 조건 시장 분류 코드
                "FID_INPUT_ISCD": ticker.itemCode, // FID 입력 종목 코드
            };

            const query: string = Object.keys(params)
                .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(params[key]))
                .join("&");

            const quotation: Quotations = await client
                .get(`/uapi/domestic-stock/v1/quotations/inquire-price?${query}`, { headers: requestHeaders })
                .then((response: AxiosResponse) => {
                    console.log(`주식현재가 일자별 정보\nMessage(Code: ${response.status}) : ${response.statusText}`);

                    const data = response.data.output;

                    const tradingDate: string = "20230113";
                    const itemCode: string = ticker.itemCode;
                    const itemName: string = ticker.itemName;
                    const startPrice: number = Number(data.stck_oprc);
                    const endPrice: number = Number(data.stck_prpr);
                    const topPrice: number = Number(data.stck_hgpr);
                    const lowestPrice: number = Number(data.stck_lwpr);
                    const totalTradingQuntity: number = Number(data.acml_vol);

                    const quotation: Quotations = Quotations.createQuotation(
                        tradingDate,
                        itemCode,
                        itemName,
                        startPrice,
                        endPrice,
                        topPrice,
                        lowestPrice,
                        totalTradingQuntity,
                    );

                    return quotation;
                })
                .catch((err: any) => {
                    console.error(err);
                    throw new Error("quotationsService inquirePrice error");
                });

            this.quotationRepository.save(quotation);

            console.log(`현재 종목 : ${ticker.itemName}`);
            break;
        }
    }

    // async inquireDaily(access_token: string): Promise<void> {
    //     const method: string = Method.GET;
    //     const url: string = URL_BASE + "/uapi/domestic-stock/v1/quotations/inquire-daily-price?";

    //     let params: Signature = {
    //         "FID_COND_MRKT_DIV_CODE": "J", // FID 조건 시장 분류 코드
    //         "FID_INPUT_ISCD": "353200", // FID 입력 종목 코드
    //         "FID_PERIOD_DIV_CODE": "D", // D : 최근 30일, W : 최근 30주, M : 최근 30개월
    //         "FID_ORG_ADJ_PRC": "0", // 0 -> 수정 주가 반영, 1 -> 수정 주가 미반영
    //     };

    //     let query: string = Object.keys(params)
    //         .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(params[key]))
    //         .join("&");

    //     const requestHeaders: HeadersInit = new Headers();
    //     requestHeaders.append("authorization", `Bearer ${access_token}`);
    //     requestHeaders.append("appkey", APP_KEY);
    //     requestHeaders.append("appsecret", APP_SECRET);
    //     requestHeaders.append("tr_id", TR_ID_DAILY);

    //     const options: RequestInit = {
    //         method: method,
    //         headers: requestHeaders,
    //     };

    //     const data = await fetch(url + query, options)
    //         .then(response => response.json())
    //         .catch(err => new Error(err));

    //     console.log(data);
    // }
}
