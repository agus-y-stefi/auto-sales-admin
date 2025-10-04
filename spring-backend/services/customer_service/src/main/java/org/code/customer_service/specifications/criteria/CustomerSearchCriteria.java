package org.code.customer_service.specifications.criteria;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class CustomerSearchCriteria {

    // Búsqueda unificada por nombre o número de cliente
    private String q; // Query parameter unificado

    // Filtro por estado(s)
    private List<String> status;

    public CustomerSearchCriteria(String q, List<String> status) {
        this.q = q;
        this.status = status;
    }
}