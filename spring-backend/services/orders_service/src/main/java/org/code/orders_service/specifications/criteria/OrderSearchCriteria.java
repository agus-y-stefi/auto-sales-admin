package org.code.orders_service.specifications.criteria;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Data
@Builder
public class OrderSearchCriteria {

    private String q;

    // Filtro por estado(s)
    private List<String> status;

    private Long customerNumber;

    public OrderSearchCriteria(String q, List<String> status, Long customerNumber) {
        this.q = q;
        this.status = status;
        this.customerNumber = customerNumber;
    }

}