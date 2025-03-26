package org.code.productservices.services;

import org.code.productservices.dto.products.ProductsResponse;
import org.code.productservices.dto.products_lines.ProductsLinesResponse;
import org.code.productservices.mappers.ProductsMapper;
import org.code.productservices.repositories.ProductsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductsService {

    private final ProductsMapper productsMapper;

    private final ProductsRepository productsRepository;

    @Autowired
    public ProductsService(ProductsMapper productsMapper, ProductsRepository productsRepository) {
        this.productsMapper = productsMapper;
        this.productsRepository = productsRepository;
    }

    public List<ProductsResponse> getProducts() {
        return productsRepository.findAll()
                .stream()
                .map(productsMapper::toResponse)
                .toList();
    }
}
