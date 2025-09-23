package org.code.orders_service.specifications.criteria;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;

@Data
@Builder
public class OrderSearchCriteria {

    private String q;

    // Parámetros para búsqueda de texto
    private Boolean exactMatch; // true para búsqueda exacta, false para LIKE

    // Constructor sin parámetros para usar con @Builder
    public OrderSearchCriteria() {
        this.exactMatch = false; // Por defecto búsqueda con LIKE
    }

    public OrderSearchCriteria(String q, Boolean exactMatch) {
        this.q = q;
        this.exactMatch = exactMatch;
    }
}