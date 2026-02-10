package org.code.orders_service.dtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OrderDtoResume {
    private Long orderNumber;
    private LocalDate orderDate;
    private String status;
    private String customerName;
    private BigDecimal totalPrice;
}
