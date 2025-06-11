package org.code.orderservices.dto.customers;

import java.math.BigDecimal;

public record CustomersResponse(
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
