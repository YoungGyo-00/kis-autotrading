package com.example.kisautotrading.domain.trading.service;

import com.example.kisautotrading.domain.trading.domain.Order;
import com.example.kisautotrading.domain.trading.dto.request.OrderRequestDto;
import com.example.kisautotrading.domain.trading.dto.response.OrderResponseDto;
import com.example.kisautotrading.domain.trading.repository.OrderRepository;
import com.example.kisautotrading.domain.trading.vo.OrderInfo;
import com.example.kisautotrading.global.common.entity.OrderType;
import com.example.kisautotrading.global.common.service.webclient.WebClientService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class TradingService {
    private final WebClientService webClientService;
    private final OrderRepository orderRepository;

    @Value("${account.cano}")
    private String CANO;

    @Value("${account.anct_prdt_cd}")
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
}
