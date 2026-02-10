package org.code.orders_service.projection;

import java.math.BigDecimal;
import java.time.LocalDate;

public interface OrderSumaryProjection {
    Long getOrderNumber();

    LocalDate getOrderDate();

    LocalDate getRequiredDate();

    LocalDate getShippedDate();

    String getStatus();

    Long getCustomerNumber();

    Long getSalesRepEmployeeNumber();

    BigDecimal getTotalOrden();

    BigDecimal getTotalPagado();
}
