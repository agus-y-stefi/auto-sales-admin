package org.code.orderservices.dto.orders;

import org.code.orderservices.dto.customers.CustomersResponse;

import java.time.LocalDateTime;

public record OrdersResponse(
        Integer orderNumber,
        LocalDateTime orderDate,
        LocalDateTime requiredDate,
        LocalDateTime shippedDate,
        String status,
        String comments,
        CustomersResponse customersResponse,
        Integer saleRepEmployeeNumber
) {
}
