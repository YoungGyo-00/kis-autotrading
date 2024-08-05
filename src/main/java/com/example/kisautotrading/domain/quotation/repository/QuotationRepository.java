package com.example.kisautotrading.domain.quotation.repository;

import com.example.kisautotrading.domain.quotation.domain.Quotation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuotationRepository extends JpaRepository<Quotation, Long> {
}
