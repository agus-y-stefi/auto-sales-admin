package org.code.orderservices.dto.orders;

import java.time.LocalDateTime;

public record OrdersCreateRequest(
        Integer orderNumber,
        LocalDateTime orderDate,
        LocalDateTime requiredDate,
        LocalDateTime shippedDate,
        String status,
        String comments,
        Integer customerNumber,
        Integer saleRepEmployeeNumber
) {
}
