package org.code.orderservices.dto.payments;

import org.code.orderservices.dto.customers.CustomersResponse;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record PaymentsResponse(
        CustomersResponse customersResponse,
        String checkNumber,
        LocalDateTime paymentDate,
        BigDecimal amount
) {
}
