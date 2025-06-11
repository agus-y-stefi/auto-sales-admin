package org.code.orderservices.dto.customers;

import java.math.BigDecimal;

public record CustomersCreateRequest(
        Integer customerNumber,
        String customerName,
        String contactLastName,
        String contactFirstName,
        String phone,
        String city,
        String country,
        BigDecimal creditLimit
) {
}
