package org.code.orderservices.dto.orders;

import java.math.BigDecimal;
import java.time.LocalDate;

public record OrdersResumeResponse(
        Integer orderNumber,
        LocalDate orderDate,
        String customerName,
        String status,
        BigDecimal total
) {
}