package org.code.product_service.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductSummaryDTO {
    
    private String productCode;
    private String productName;
    private String productLine;
    private Short quantityInStock;
    private BigDecimal buyPrice;
    private BigDecimal msrp;
    private String productVendor;
}
