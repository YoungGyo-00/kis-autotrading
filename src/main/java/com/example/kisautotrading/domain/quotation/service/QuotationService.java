package com.example.kisautotrading.domain.quotation.service;

import com.example.kisautotrading.domain.quotation.domain.Quotation;
import com.example.kisautotrading.domain.quotation.dto.response.GetInquireDailyPriceDto;
import com.example.kisautotrading.domain.quotation.dto.response.GetInquirePriceDto;
import com.example.kisautotrading.domain.quotation.helper.QuotationRequestHelper;
import com.example.kisautotrading.domain.quotation.repository.QuotationRepository;
import com.example.kisautotrading.domain.quotation.vo.QuotationInfoVo;
import com.example.kisautotrading.global.common.service.webclient.dto.Output;
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
    private final QuotationRequestHelper requestHelper;

    // 주식 현재가 시세
    @Transactional
    public void createInquirePrice() {
        String url = requestHelper.getInquirePriceUrl();
        String trId = requestHelper.getInquirePriceTrId();

        Map<String, String> queryParams = requestHelper.getInquirePriceParams();

        GetInquirePriceDto getInquirePriceDto = webClientService.getSingle(url, queryParams, trId, GetInquirePriceDto.class, Output.class);
        QuotationInfoVo quotationInfoVo = requestHelper.createQuotationInfoVo();

        quotationRepository.save(Quotation.of(quotationInfoVo, getInquirePriceDto));
    }

    // 주식 30일 시세 확인
    @Transactional
    public void createInquireDailyPrice() {
        String url = requestHelper.getInquireDailyPriceUrl();
        String trId = requestHelper.getInquireDailyPriceTrId();

        Map<String, String> queryParams = requestHelper.getInquireDailyPriceParams();

        List<GetInquireDailyPriceDto> getInquirePriceDailyDtoList = webClientService.getList(url, queryParams, trId, GetInquireDailyPriceDto.class, Output.class);

        getInquirePriceDailyDtoList.forEach(getInquireDailyPriceDto -> {
            QuotationInfoVo quotationInfoVo = requestHelper.createQuotationInfoVo(getInquireDailyPriceDto.getTradingDate());
            quotationRepository.save(Quotation.of(quotationInfoVo, getInquireDailyPriceDto));
        });
    }
}
