package org.code.productservices.dto.products;

import java.math.BigDecimal;

public record ProductsUpdateRequest (
        String productName,
        String productScale,
        String productVendor,
        String productDescription,
        Integer quantityInStock,
        BigDecimal buyPrice,
        BigDecimal MSRP,
        String productLine
){
}
