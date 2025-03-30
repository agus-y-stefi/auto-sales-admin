package org.code.productservices.dto.products;

import org.code.productservices.dto.products_lines.ProductsLinesRequest;
import org.code.productservices.dto.products_lines.ProductsLinesResponse;

import java.math.BigDecimal;

public record ProductsRequest(
        String productCode,
        String productName,
        String productScale,
        String productVendor,
        String productDescription,
        Integer quantityInStock,
        BigDecimal buyPrice,
        BigDecimal MSRP,
        String productLine
) {
}
