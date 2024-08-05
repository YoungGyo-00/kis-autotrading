package com.example.kisautotrading.domain.trading.repository;

import com.example.kisautotrading.domain.trading.domain.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Order, Long> {
}
