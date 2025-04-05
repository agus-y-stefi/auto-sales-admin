package org.code.productservices.mappers;

import org.code.productservices.dto.products.ProductsResponse;
import org.code.productservices.models.Products;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProductsMapper {

    private final ProductsLinesMapper productsLinesMapper;

    @Autowired
    public ProductsMapper(ProductsLinesMapper productsLinesMapper) {
        this.productsLinesMapper = productsLinesMapper;
    }


    public ProductsResponse toResponse(Products productsResponse) {
        return new ProductsResponse(
                productsResponse.getProductCode(),
                productsResponse.getProductName(),
                productsResponse.getProductScale(),
                productsResponse.getProductVendor(),
                productsResponse.getProductDescription(),
                productsResponse.getQuantityInStock(),
                productsResponse.getBuyPrice(),
                productsResponse.getMSRP(),
                productsLinesMapper.toResponse(productsResponse.getProductsLine())
        );
    }

}
