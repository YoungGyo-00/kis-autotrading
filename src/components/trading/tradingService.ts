import { Service } from "typedi";

import client from "@axios";
import { ACNT_PRDT_CD, APP_KEY, APP_SECRET, CANO } from "@env";
import { ITradingService, OrderBody } from "./interface/ITradingService";
import { OAuthService } from "../oauth/oauthService";
import { AxiosHeaders, AxiosResponse } from "axios";
import { InquirePsblOrderDto, OrderDto } from "./dtos";

const BUY: string = "TTTC0802U";
const BUYABLE: string = "TTTC8908R";
const SELL: string = "TTTC0801U";
const SELLABLE: string = "VTTC8908R";
const TR_ID_INQUIRE_BALANCE: string = "TTTC8434R";

@Service()
export class TradingService implements ITradingService {
    constructor(private oauthService: OAuthService) {}

    async order(access_token: string, orderDto: OrderDto): Promise<void> {
        try {
            let TR_ID: string;
            let orderType: string;

            const { trID, itemCode, itemName, orderDivision, orderQuantity, orderUnitPrice } = orderDto;

            if (trID == 1) {
                TR_ID = BUY;
                orderType = "매수";
            } else if (trID == 2) {
                TR_ID = SELL;
                orderType = "매도";
            } else {
                throw new Error("주문 코드(TR_ID)가 잘못 설정 되었습니다.");
            }

            const body: OrderBody = {
                "CANO": CANO, // 종합계좌번호 앞 8자리
                "ACNT_PRDT_CD": ACNT_PRDT_CD, // 뒤 2자리
                "PDNO": itemCode, // 종목코드(6자리)
                "ORD_DVSN": orderDivision, // 00 지정가, 01 시장가, 02 조건부지정가
                "ORD_QTY": orderQuantity, // 주문 수량
                "ORD_UNPR": orderUnitPrice, // 주문 단가
            };

            const hashkey: string = await this.oauthService.hashkey(body);

            const requestHeaders: AxiosHeaders = new AxiosHeaders({
                "authorization": `Bearer ${access_token}`,
                "appkey": APP_KEY,
                "appsecret": APP_SECRET,
                "tr_id": TR_ID,
                "hashkey": hashkey,
            });

            await client
                .post("/uapi/domestic-stock/v1/trading/order-cash", body, { headers: requestHeaders })
                .then((response: AxiosResponse) => {
                    console.log(`주문 ${orderType} 성공\nMessage(Code: ${response.status}) : ${response.statusText}`);
                })
                .catch((err: any) => {
                    console.error(err);
                    throw new Error("TradingService order error");
                });
        } catch (err: any) {
            console.error(err);
        }
    }

    async inquireBlanace(access_token: string): Promise<void> {
        try {
            const params: Signature = {
                "CANO": CANO,
                "ACNT_PRDT_CD": ACNT_PRDT_CD,
                "AFHR_FLPR_YN": "N",
                "OFL_YN": "",
                "INQR_DVSN": "1",
                "UNPR_DVSN": "02",
                "FUND_STTL_ICLD_YN": "N",
                "FNCG_AMT_AUTO_RDPT_YN": "N",
                "PRCS_DVSN": "01",
                "CTX_AREA_FK100": "",
                "CTX_AREA_NK100": "",
            };

            const query: string = Object.keys(params)
                .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(params[key]))
                .join("&");

            const requestHeaders: AxiosHeaders = new AxiosHeaders({
                "authorization": `Bearer ${access_token}`,
                "appkey": APP_KEY,
                "appsecret": APP_SECRET,
                "tr_id": TR_ID_INQUIRE_BALANCE,
            });

            await client
                .post(`/uapi/domestic-stock/v1/trading/inquire-balance?${query}`, { headers: requestHeaders })
                .then((response: AxiosResponse) => {
                    console.log(`잔고조회 성공\nMessage(Code: ${response.status}) : ${response.statusText}`);

                    const dataList = response.data.output;

                    for (const data of dataList) {
                        console.log(
                            `\n종목명 : ${data.prdt_name} | 보유수량 : ${data.hldg_qty} | 평가금액 : ${data.evlu_amt} | 매입평균가격 : ${data.pchs_amt}\n------------------------\n`,
                        );
                    }
                })
                .catch((err: any) => {
                    throw new Error("TradingService inquireBlanace error");
                });
        } catch (err) {
            console.log(err);
        }
    }

    async inquirePsblOrder(access_token: string, inquirePsblOrderDto: InquirePsblOrderDto): Promise<void> {
        try {
            let TR_ID: string;
            let orderType: string;

            const { trID, itemCode, itemName, orderDivision, orderUnitPrice } = inquirePsblOrderDto;

            if (trID == 1) {
                TR_ID = BUYABLE;
                orderType = "매수";
            } else if (trID == 2) {
                TR_ID = SELLABLE;
                orderType = "매도";
            } else {
                throw new Error("주문 코드(TR_ID)가 잘못 설정 되었습니다.");
            }

            const params: Signature = {
                "CANO": CANO,
                "ACNT_PRDT_CD": ACNT_PRDT_CD,
                "PDNO": itemCode,
                "ORD_UNRP": orderUnitPrice,
                "ORD_DVSN": orderDivision,
                "CMA_EVLU_AMT_ICLD_YN": "N", // CM평가금액포함여부
                "OVRS_ICLD_YN": "N", // 해외포함여부
            };

            const query: string = Object.keys(params)
                .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(params[key]))
                .join("&");

            const requestHeaders: AxiosHeaders = new AxiosHeaders({
                "authorization": `Bearer ${access_token}`,
                "appkey": APP_KEY,
                "appsecret": APP_SECRET,
                "tr_id": TR_ID,
            });

            const quantity: number = await client
                .post(`/uapi/domestic-stock/v1/trading/inquire-psbl-order?${query}`, { headers: requestHeaders })
                .then((response: AxiosResponse) => {
                    const data = response.data.output;

                    console.log(
                        `${itemName} ${orderType}가능수량조회 성공\nMessage(Code: ${response.status}) : ${response.statusText}`,
                    );
                    console.log(`주문가능현금 : ${data.ord_psbl_cash}, 매수가능수량 : ${data.nrcvb_buy_qty}`);

                    return data.nrcvb_buy_qty;
                })
                .catch((err: any) => {
                    console.error(err);
                    throw new Error("TradingService inquirePsblOrder error");
                });
        } catch (err: any) {
            console.error(err);
        }
    }
}
