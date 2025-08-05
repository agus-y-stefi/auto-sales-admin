package org.code.orders_service.specifications.criteria;

import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@Builder
public class PaymentSearchCriteria {

    private Long orderNumber;
    private String checkNumber;
    private LocalDate paymentDateFrom;
    private LocalDate paymentDateTo;
    private BigDecimal minAmount;
    private BigDecimal maxAmount;

    // Parámetros para búsqueda de texto
    private Boolean exactMatch; // true para búsqueda exacta, false para LIKE

    // Constructor sin parámetros para usar con @Builder
    public PaymentSearchCriteria() {
        this.exactMatch = false; // Por defecto búsqueda con LIKE
    }

    public PaymentSearchCriteria(Long orderNumber, String checkNumber,
                                 LocalDate paymentDateFrom, LocalDate paymentDateTo,
                                 BigDecimal minAmount, BigDecimal maxAmount,
                                 Boolean exactMatch) {
        this.orderNumber = orderNumber;
        this.checkNumber = checkNumber;
        this.paymentDateFrom = paymentDateFrom;
        this.paymentDateTo = paymentDateTo;
        this.minAmount = minAmount;
        this.maxAmount = maxAmount;
        this.exactMatch = exactMatch != null ? exactMatch : false;
    }
}