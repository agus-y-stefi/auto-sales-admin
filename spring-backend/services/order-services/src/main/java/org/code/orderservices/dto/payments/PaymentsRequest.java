package org.code.orderservices.dto.payments;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record PaymentsRequest(
        Integer customerNumber,
        String checkNumber,
        LocalDateTime paymentDate,
        BigDecimal amount
) {
}
