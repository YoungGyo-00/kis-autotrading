package com.example.kisautotrading.domain.quotation.service;

import com.example.kisautotrading.domain.quotation.domain.Quotation;
import com.example.kisautotrading.domain.quotation.dto.response.GetInquireDailyPriceDto;
import com.example.kisautotrading.domain.quotation.dto.response.GetInquirePriceDto;
import com.example.kisautotrading.domain.quotation.repository.QuotationRepository;
import com.example.kisautotrading.domain.quotation.vo.QuotationInfoVo;
import com.example.kisautotrading.global.util.DateUtil;
import com.example.kisautotrading.global.common.service.webclient.WebClientService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class QuotationService {
    private final WebClientService webClientService;
    private final QuotationRepository quotationRepository;

    // 주식현재가 시세
    @Transactional
    public void creaetInquirePrice(){
        String url = "/uapi/domestic-stock/v1/quotations/inquire-price";
        String trId = "FHKST01010100";
        String itemCode = "353200";
        String itemName = "대덕전자";

        Map<String, String> queryParams = new HashMap<>();
        queryParams.put("FID_COND_MRKT_DIV_CODE", "J");
        queryParams.put("FID_INPUT_ISCD", itemCode);

        GetInquirePriceDto getInquirePriceDto = webClientService.getSingle(url, queryParams, trId, GetInquirePriceDto.class);
        QuotationInfoVo quotationInfoVo = QuotationInfoVo.builder()
                .tradingDate(DateUtil.getTodayDateString())
                .itemCode(itemCode)
                .itemName(itemName)
                .build();

        quotationRepository.save(Quotation.of(quotationInfoVo, getInquirePriceDto));
    }

    @Transactional
    public void createInquireDailyPrice(){
        String url = "/uapi/domestic-stock/v1/quotations/inquire-daily-price";
        String trId = "FHKST01010400";
        String itemCode = "353200";
        String itemName = "대덕전자";

        Map<String, String> queryParams = new HashMap<>();
        queryParams.put("FID_COND_MRKT_DIV_CODE", "J");
        queryParams.put("FID_INPUT_ISCD", itemCode);
        queryParams.put("FID_PERIOD_DIV_CODE", "D");
        queryParams.put("FID_ORG_ADJ_PRC", "0");

        List<GetInquireDailyPriceDto> getInquirePriceDailyDtoList = webClientService.getList(url, queryParams, trId, GetInquireDailyPriceDto.class);

        getInquirePriceDailyDtoList.forEach(getInquireDailyPriceDto -> {
            QuotationInfoVo quotationInfoVo = QuotationInfoVo.builder()
                    .tradingDate(DateUtil.convertToDashFormat(getInquireDailyPriceDto.getTradingDate()))
                    .itemCode(itemCode)
                    .itemName(itemName)
                    .build();
            quotationRepository.save(Quotation.of(quotationInfoVo, getInquireDailyPriceDto));
        });
    }
}
