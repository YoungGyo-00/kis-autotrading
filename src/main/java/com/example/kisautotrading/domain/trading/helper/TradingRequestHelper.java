package com.example.kisautotrading.domain.trading.helper;

import com.example.kisautotrading.domain.trading.vo.OrderInfo;
import com.example.kisautotrading.global.common.entity.OrderType;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;

@Component
public class TradingRequestHelper {
    @Value("${account.cano}")
    private String CANO;

    @Value("${account.acnt_prdt_cd}")
    private String ACNT_PRDT_CD;

    public String getOrderUrl() {
        return "/uapi/domestic-stock/v1/trading/order-cash";
    }

    public String getInquireBalanceUrl() {
        return "/uapi/domestic-stock/v1/trading/inquire-balance";
    }

    public String getOrderTrId(OrderType orderType) {
        return orderType == OrderType.BUY ? "TTTC0802U" : "TTTC0801U";
    }

    public String getInquireBalanceTrId() {
        return "TTTC8434R";
    }

    public Map<String, String> getInquireBalanceParams() {
        Map<String, String> queryParams = new HashMap<>();

        queryParams.put("CANO", CANO);
        queryParams.put("ACNT_PRDT_CD", ACNT_PRDT_CD);
        queryParams.put("AFHR_FLPR_YN", "N");
        queryParams.put("OFL_YN", "");
        queryParams.put("INQR_DVSN", "1");
        queryParams.put("UNPR_DVSN", "01");
        queryParams.put("FUND_STTL_ICLD_YN", "N");
        queryParams.put("FNCG_AMT_AUTO_RDPT_YN", "N");
        queryParams.put("PRCS_DVSN", "00");
        queryParams.put("CTX_AREA_FK100", "");
        queryParams.put("CTX_AREA_NK100", "");

        return queryParams;
    }

    public OrderInfo createOrderInfo(OrderType orderType) {
        String itemName = "대덕전자";
        String itemCode = "353200";
        String ORD_QTY = "1";
        String ORD_UNPR = "0";

        return OrderInfo.of(CANO, ACNT_PRDT_CD, itemName, itemCode, "00", orderType, ORD_QTY, ORD_UNPR);
    }
}
