package org.code.customer_service.specifications.criteria;

import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

@Data
@Builder
public class CustomerSearchCriteria {

    private String customerName;
    private String city;
    private String country;
    private BigDecimal minCreditLimit;
    private BigDecimal maxCreditLimit;
    private String contactFirstName;
    private String contactLastName;
    private String phone;
    private List<String> status; // Cambiado de String a List<String>

    // Parámetros para búsqueda de texto
    private Boolean exactMatch; // true para búsqueda exacta, false para LIKE

    // Constructor sin parámetros para usar con @Builder
    public CustomerSearchCriteria() {
        this.exactMatch = false; // Por defecto búsqueda con LIKE
    }

    public CustomerSearchCriteria(String customerName, String city, String country,
                                  BigDecimal minCreditLimit, BigDecimal maxCreditLimit,
                                  String contactFirstName, String contactLastName,
                                  String phone, List<String> status, Boolean exactMatch) {
        this.customerName = customerName;
        this.city = city;
        this.country = country;
        this.minCreditLimit = minCreditLimit;
        this.maxCreditLimit = maxCreditLimit;
        this.contactFirstName = contactFirstName;
        this.contactLastName = contactLastName;
        this.phone = phone;
        this.status = status;
        this.exactMatch = exactMatch != null ? exactMatch : false;
    }
}