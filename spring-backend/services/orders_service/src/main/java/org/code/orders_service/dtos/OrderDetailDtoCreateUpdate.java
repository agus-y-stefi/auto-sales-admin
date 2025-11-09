package org.code.orders_service.dtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.bind.annotation.PathVariable;

import java.math.BigDecimal;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OrderDetailDtoCreateUpdate {
    private Long orderNumber;
    private String productCode;
    private Long quantityOrdered;
    private BigDecimal priceEach;
}