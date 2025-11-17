package org.code.orders_service.projections;

import java.math.BigDecimal;
import java.time.LocalDate;

public interface OrderResumeProjection {

    Long getOrderNumber();
    LocalDate getOrderDate();
    LocalDate getRequiredDate();
    LocalDate getShippedDate();
    String getStatus();
    String getComments();
    Long getCustomerNumber();
    Long getSalesRepEmployeeNumber();
    BigDecimal getTotalPaidAmount();
    Boolean getIsFullyPaid();
    BigDecimal getRemainingAmount();
}
