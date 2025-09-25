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

    public OrderSearchCriteria(String q, List<String> status) {
        this.q = q;
        this.status = status;
    }

}