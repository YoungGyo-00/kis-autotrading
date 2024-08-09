package com.example.kisautotrading.domain.trading.service;

import com.example.kisautotrading.domain.trading.domain.Order;
import com.example.kisautotrading.domain.trading.dto.request.OrderRequestDto;
import com.example.kisautotrading.domain.trading.dto.response.InquireBalanceResponseDto;
import com.example.kisautotrading.domain.trading.dto.response.OrderResponseDto;
import com.example.kisautotrading.domain.trading.repository.OrderRepository;
import com.example.kisautotrading.domain.trading.vo.OrderInfo;
import com.example.kisautotrading.global.common.entity.OrderType;
import com.example.kisautotrading.global.common.service.webclient.WebClientService;
import com.example.kisautotrading.global.common.service.webclient.dto.Output1;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class TradingService {
    private final WebClientService webClientService;
    private final OrderRepository orderRepository;

    @Value("${account.cano}")
    private String CANO;

    @Value("${account.acnt_prdt_cd}")
    private String ACNT_PRDT_CD;

    @Transactional
    public void createOrder(OrderType orderType){
        String url = "/uapi/domestic-stock/v1/trading/order-cash";
        String trId = orderType == OrderType.BUY ? "TTTC0802U" : "TTTC0801U";
        String itemName = "대덕전자";
        String itemCode = "353200";
        String ORD_QTY = "1";
        String ORD_UNPR = "0";

        OrderInfo orderInfo = OrderInfo.of(CANO, ACNT_PRDT_CD, itemName, itemCode, "00", orderType, ORD_QTY, ORD_UNPR);
        OrderResponseDto orderResponseDto = webClientService.post(url, trId, OrderRequestDto.from(orderInfo), OrderResponseDto.class);

        orderRepository.save(Order.of(orderResponseDto, orderInfo));
    }

    // 주식잔고조회
    public void getInquireBalance() {
        String url = "/uapi/domestic-stock/v1/trading/inquire-balance";
        String trId = "TTTC8434R";

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

        List<InquireBalanceResponseDto> inquireBalancelist = webClientService.getList(url, queryParams, trId, InquireBalanceResponseDto.class, Output1.class);

        inquireBalancelist.forEach(inquireBalance -> {
            log.info(inquireBalance.getProductName());
        });
    }
}
