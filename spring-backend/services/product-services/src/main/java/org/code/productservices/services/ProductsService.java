package org.code.productservices.services;

import org.code.productservices.dto.products.ProductsRequest;
import org.code.productservices.dto.products.ProductsResponse;
import org.code.productservices.dto.products_lines.ProductsLinesResponse;
import org.code.productservices.mappers.ProductsMapper;
import org.code.productservices.models.Products;
import org.code.productservices.models.ProductsLines;
import org.code.productservices.repositories.ProductsLinesRepository;
import org.code.productservices.repositories.ProductsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductsService {

    private final ProductsMapper productsMapper;
    private final ProductsLinesRepository productsLinesRepository;

    private final ProductsRepository productsRepository;

    @Autowired
    public ProductsService(ProductsMapper productsMapper, ProductsLinesRepository productsLinesRepository, ProductsRepository productsRepository) {
        this.productsMapper = productsMapper;
        this.productsLinesRepository = productsLinesRepository;
        this.productsRepository = productsRepository;
    }

    public List<ProductsResponse> getProducts() {
        return productsRepository.findAll()
                .stream()
                .map(productsMapper::toResponse)
                .toList();
    }

    public ProductsResponse getProduct(Integer productId) {
        return productsMapper.toResponse(
                productsRepository.findById(productId)
                        .orElseThrow(() -> new RuntimeException("Product not found"))
        );
    }

    public ProductsResponse updateProduct(Integer productId, ProductsRequest productsRequest) {
        Products p = productsRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));
        return null;
    }

    public void deleteProduct(Integer productId) {
        productsRepository.deleteById(productId);
    }


    public ProductsResponse createProduct(ProductsRequest productsRequest) {
        return null;
    }
}
