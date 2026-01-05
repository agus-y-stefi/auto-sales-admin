package org.code.orders_service.dtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TopProductCustomerDTO {

    private String productCode;

    private String productName;

    private String productDescription;

    private Short quantityInStock;

    private BigDecimal msrp;

    private Long cantidadComprada;
}
