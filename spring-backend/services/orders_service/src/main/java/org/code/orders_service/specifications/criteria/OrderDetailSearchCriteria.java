package org.code.orders_service.specifications.criteria;

import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;

@Data
@Builder
public class OrderDetailSearchCriteria {

    private Long orderNumber;
    private String productCode;
    private Long minQuantityOrdered;
    private Long maxQuantityOrdered;
    private BigDecimal minPriceEach;
    private BigDecimal maxPriceEach;

    // Parámetros para búsqueda de texto
    private Boolean exactMatch; // true para búsqueda exacta, false para LIKE

    // Constructor sin parámetros para usar con @Builder
    public OrderDetailSearchCriteria() {
        this.exactMatch = false; // Por defecto búsqueda con LIKE
    }

    public OrderDetailSearchCriteria(Long orderNumber, String productCode,
                                     Long minQuantityOrdered, Long maxQuantityOrdered,
                                     BigDecimal minPriceEach, BigDecimal maxPriceEach,
                                     Boolean exactMatch) {
        this.orderNumber = orderNumber;
        this.productCode = productCode;
        this.minQuantityOrdered = minQuantityOrdered;
        this.maxQuantityOrdered = maxQuantityOrdered;
        this.minPriceEach = minPriceEach;
        this.maxPriceEach = maxPriceEach;
        this.exactMatch = exactMatch != null ? exactMatch : false;
    }
}