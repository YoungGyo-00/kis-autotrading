package com.example.kisautotrading.domain.trading.service;

import com.example.kisautotrading.domain.trading.domain.Order;
import com.example.kisautotrading.domain.trading.dto.request.OrderRequestDto;
import com.example.kisautotrading.domain.trading.dto.response.InquireBalanceResponseDto;
import com.example.kisautotrading.domain.trading.dto.response.OrderResponseDto;
import com.example.kisautotrading.domain.trading.helper.TradingRequestHelper;
import com.example.kisautotrading.domain.trading.repository.OrderRepository;
import com.example.kisautotrading.domain.trading.vo.OrderInfo;
import com.example.kisautotrading.global.common.entity.OrderType;
import com.example.kisautotrading.global.common.service.webclient.WebClientService;
import com.example.kisautotrading.global.common.service.webclient.dto.Output1;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class TradingService {
    private final WebClientService webClientService;
    private final OrderRepository orderRepository;
    private final TradingRequestHelper requestHelper;

    // 주식 주문
    @Transactional
    public void createOrder(OrderType orderType) {
        String url = requestHelper.getOrderUrl();
        String trId = requestHelper.getOrderTrId(orderType);

        OrderInfo orderInfo = requestHelper.createOrderInfo(orderType);
        OrderRequestDto orderRequestDto = OrderRequestDto.from(orderInfo);
        OrderResponseDto orderResponseDto = webClientService.post(url, trId, orderRequestDto, OrderResponseDto.class);

        orderRepository.save(Order.of(orderResponseDto, orderInfo));
    }

    // 주식잔고조회
    public void getInquireBalance() {
        String url = requestHelper.getInquireBalanceUrl();
        String trId = requestHelper.getInquireBalanceTrId();
        Map<String, String> queryParams = requestHelper.getInquireBalanceParams();

        List<InquireBalanceResponseDto> inquireBalanceList = webClientService.getList(url, queryParams, trId, InquireBalanceResponseDto.class, Output1.class);
        inquireBalanceList.forEach(balance -> log.info(balance.getProductName()));
    }
}