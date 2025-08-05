package org.code.orders_service.specifications.criteria;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;

@Data
@Builder
public class OrderSearchCriteria {

    private String status;
    private LocalDate orderDateFrom;
    private LocalDate orderDateTo;
    private LocalDate requiredDateFrom;
    private LocalDate requiredDateTo;
    private LocalDate shippedDateFrom;
    private LocalDate shippedDateTo;
    private Long customerNumber;
    private Long salesRepEmployeeNumber;
    private String comments;

    // Parámetros para búsqueda de texto
    private Boolean exactMatch; // true para búsqueda exacta, false para LIKE

    // Constructor sin parámetros para usar con @Builder
    public OrderSearchCriteria() {
        this.exactMatch = false; // Por defecto búsqueda con LIKE
    }

    public OrderSearchCriteria(String status, LocalDate orderDateFrom, LocalDate orderDateTo,
                               LocalDate requiredDateFrom, LocalDate requiredDateTo,
                               LocalDate shippedDateFrom, LocalDate shippedDateTo,
                               Long customerNumber, Long salesRepEmployeeNumber,
                               String comments, Boolean exactMatch) {
        this.status = status;
        this.orderDateFrom = orderDateFrom;
        this.orderDateTo = orderDateTo;
        this.requiredDateFrom = requiredDateFrom;
        this.requiredDateTo = requiredDateTo;
        this.shippedDateFrom = shippedDateFrom;
        this.shippedDateTo = shippedDateTo;
        this.customerNumber = customerNumber;
        this.salesRepEmployeeNumber = salesRepEmployeeNumber;
        this.comments = comments;
        this.exactMatch = exactMatch != null ? exactMatch : false;
    }
}