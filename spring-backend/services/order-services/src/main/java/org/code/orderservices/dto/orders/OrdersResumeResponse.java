package org.code.orderservices.dto.orders;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
@Data
@AllArgsConstructor
public class OrdersResumeResponse

{
    private final Integer orderNumber;
    private final LocalDate orderDate;
    private final String customerName;
    private final String status;
    private BigDecimal total;


}