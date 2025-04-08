package org.code.productservices.services;

import jakarta.persistence.EntityNotFoundException;
import org.code.productservices.dto.products_lines.ProductsLinesCreateRequest;
import org.code.productservices.dto.products_lines.ProductsLinesResponse;
import org.code.productservices.dto.products_lines.ProductsLinesUpdateRequest;
import org.code.productservices.mappers.ProductsLinesMapper;
import org.code.productservices.models.ProductsLines;
import org.code.productservices.repositories.ProductsLinesRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class ProductsLinesService {

    private final ProductsLinesMapper productsLinesMapper;
    private final ProductsLinesRepository productsLinesRepository;

    public ProductsLinesService(ProductsLinesMapper productsLinesMapper, ProductsLinesRepository productsLinesRepository) {
        this.productsLinesMapper = productsLinesMapper;
        this.productsLinesRepository = productsLinesRepository;
    }

    public List<ProductsLinesResponse> getProductsLines() {
        return this.productsLinesRepository.findAll()
                .stream().map(productsLinesMapper::toResponse)
                .toList();
    }

    public ProductsLinesResponse getProductsLineById(String productLine) {
        return this.productsLinesRepository.findById(productLine)
                .map(productsLinesMapper::toResponse)
                .orElseThrow(() -> new EntityNotFoundException("Product line not found"));
    }

    public ProductsLinesResponse createProductsLine(ProductsLinesCreateRequest productsLines) {

        if (productsLinesRepository.existsById(productsLines.productLine()))
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Product line already exists");

        return productsLinesMapper.toResponse(
                productsLinesRepository.save(
                        productsLinesMapper.toEntity(productsLines)
                )
        );
    }

    public ProductsLinesResponse updateProductsLine(String productLine, ProductsLinesUpdateRequest productsLinesUpdateRequest) {
        ProductsLines productsLinesEntity = productsLinesRepository.findById(productLine)
                .orElseThrow(() -> new EntityNotFoundException("Product line not found"));

        productsLinesMapper.updateEntity(productsLinesUpdateRequest, productsLinesEntity);

        return productsLinesMapper.toResponse(
                productsLinesRepository.save(productsLinesEntity)
        );
    }

    public void deleteProductsLine(String productLine) {
        ProductsLines productsLinesEntity = productsLinesRepository.findById(productLine)
                .orElseThrow(() -> new EntityNotFoundException("Product line not found"));

        productsLinesRepository.delete(productsLinesEntity);
    }
}
