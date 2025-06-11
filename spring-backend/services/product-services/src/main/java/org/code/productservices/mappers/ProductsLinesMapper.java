package org.code.productservices.mappers;

import org.code.productservices.dto.products_lines.ProductsLinesCreateRequest;
import org.code.productservices.dto.products_lines.ProductsLinesResponse;
import org.code.productservices.dto.products_lines.ProductsLinesUpdateRequest;
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

    public ProductsLines toEntity(ProductsLinesCreateRequest productsLines) {
        return ProductsLines.builder()
                .productLine(productsLines.productLine())
                .textDescription(productsLines.textDescription())
                .build();
    }

    public void updateEntity(ProductsLinesUpdateRequest productsLinesUpdateRequest, ProductsLines productsLinesEntity) {
        if (productsLinesUpdateRequest.textDescription() != null)
            productsLinesEntity.setTextDescription(productsLinesUpdateRequest.textDescription());
    }

}
