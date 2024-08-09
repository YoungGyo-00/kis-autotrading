package com.example.kisautotrading.domain.quotation.helper;

import com.example.kisautotrading.domain.quotation.vo.QuotationInfoVo;
import com.example.kisautotrading.global.util.DateUtil;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;

@Component
public class QuotationRequestHelper {
    public String getInquirePriceUrl() {
        return "/uapi/domestic-stock/v1/quotations/inquire-price";
    }

    public String getInquireDailyPriceUrl() {
        return "/uapi/domestic-stock/v1/quotations/inquire-daily-price";
    }

    public String getInquirePriceTrId() {
        return "FHKST01010100";
    }

    public String getInquireDailyPriceTrId() {
        return "FHKST01010400";
    }

    public Map<String, String> getInquirePriceParams() {
        String itemCode = "353200";

        Map<String, String> queryParams = new HashMap<>();

        queryParams.put("FID_COND_MRKT_DIV_CODE", "J");
        queryParams.put("FID_INPUT_ISCD", itemCode);

        return queryParams;
    }

    public Map<String, String> getInquireDailyPriceParams() {
        String itemCode = "353200";

        Map<String, String> queryParams = new HashMap<>();

        queryParams.put("FID_COND_MRKT_DIV_CODE", "J");
        queryParams.put("FID_INPUT_ISCD", itemCode);
        queryParams.put("FID_PERIOD_DIV_CODE", "D");
        queryParams.put("FID_ORG_ADJ_PRC", "0");

        return queryParams;
    }

    public QuotationInfoVo createQuotationInfoVo() {
        String itemCode = "353200";
        String itemName = "대덕전자";

        return QuotationInfoVo.builder()
                .tradingDate(DateUtil.getTodayDateString())
                .itemCode(itemCode)
                .itemName(itemName)
                .build();
    }

    public QuotationInfoVo createQuotationInfoVo(String tradingDate) {
        String itemCode = "353200";
        String itemName = "대덕전자";

        return QuotationInfoVo.builder()
                .tradingDate(DateUtil.convertToDashFormat(tradingDate))
                .itemCode(itemCode)
                .itemName(itemName)
                .build();
    }
}
