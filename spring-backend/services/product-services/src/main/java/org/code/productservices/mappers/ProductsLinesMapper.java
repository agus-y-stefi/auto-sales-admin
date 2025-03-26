package org.code.productservices.mappers;

import org.code.productservices.dto.products_lines.ProductsLinesResponse;
import org.code.productservices.models.ProductsLines;
import org.springframework.stereotype.Service;

@Service
public class ProductsLinesMapper {

    public ProductsLinesResponse toResponse(ProductsLines productsLines){
        return new ProductsLinesResponse(
                productsLines.getProductLine(),
                productsLines.getTextDescription()
        );
    }

}
