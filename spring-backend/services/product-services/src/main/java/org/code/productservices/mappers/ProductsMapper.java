package org.code.productservices.mappers;

import org.code.productservices.dto.products.ProductsCreateRequest;
import org.code.productservices.dto.products.ProductsResponse;
import org.code.productservices.dto.products.ProductsUpdateRequest;
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

    public Products toEntity(ProductsCreateRequest productsCreateRequest) {
        return Products.builder()
                .productCode(productsCreateRequest.productCode())
                .productName(productsCreateRequest.productName())
                .productScale(productsCreateRequest.productScale())
                .productVendor(productsCreateRequest.productVendor())
                .productDescription(productsCreateRequest.productDescription())
                .quantityInStock(productsCreateRequest.quantityInStock())
                .buyPrice(productsCreateRequest.buyPrice())
                .MSRP(productsCreateRequest.MSRP())
                .productsLine(null)
                .build();
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
