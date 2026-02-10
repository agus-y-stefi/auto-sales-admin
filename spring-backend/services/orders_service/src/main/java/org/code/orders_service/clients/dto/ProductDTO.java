package org.code.orders_service.clients.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductDTO {

    private String productCode;

    private String productName;

    private String productLine;

    private String productScale;

    private String productVendor;

    private String productDescription;

    private Short quantityInStock;

    private BigDecimal buyPrice;

    private BigDecimal msrp;

    // Información adicional de la línea de producto para respuestas
    private String productLineDescription;
}


