package com.example.kisautotrading.domain.quotation.service;

import com.example.kisautotrading.domain.quotation.domain.Quotation;
import com.example.kisautotrading.domain.quotation.dto.response.GetInquirePriceDto;
import com.example.kisautotrading.domain.quotation.repository.QuotationRepository;
import com.example.kisautotrading.domain.quotation.vo.QuotationInfoVo;
import com.example.kisautotrading.global.util.DateUtil;
import com.example.kisautotrading.global.util.WebClientUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.Map;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class QuotationService {
    private final WebClientUtil webClientUtil;
    private final QuotationRepository quotationRepository;

    // 주식현재가 시세
    @Transactional
    public void getInquirePrice(){
        String url = "/uapi/domestic-stock/v1/quotations/inquire-price";
        String trId = "FHKST01010100";
        String itemCode = "353200";
        String itemName = "대덕전자";

        Map<String, String> queryParams = new HashMap<>();
        queryParams.put("FID_COND_MRKT_DIV_CODE", "J");
        queryParams.put("FID_INPUT_ISCD", itemCode);

        GetInquirePriceDto getInquirePriceDto = webClientUtil.get(url, queryParams, trId, GetInquirePriceDto.class);
        QuotationInfoVo quotationInfoVo = QuotationInfoVo.builder()
                .tradingDate(DateUtil.getTodayDateString())
                .itemCode(itemCode)
                .itemName(itemName)
                .build();

        quotationRepository.save(Quotation.of(quotationInfoVo, getInquirePriceDto));
    }
}
