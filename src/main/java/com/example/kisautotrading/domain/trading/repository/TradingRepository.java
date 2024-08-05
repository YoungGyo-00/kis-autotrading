package com.example.kisautotrading.domain.trading.repository;

import com.example.kisautotrading.domain.trading.domain.Trading;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TradingRepository extends JpaRepository<Trading, Long> {
}
