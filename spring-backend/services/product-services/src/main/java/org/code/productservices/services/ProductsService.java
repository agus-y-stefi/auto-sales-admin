package org.code.productservices.services;

import org.code.productservices.dto.products.ProductsResponse;
import org.code.productservices.mappers.ProductsMapper;
import org.code.productservices.models.Products;
import org.code.productservices.repositories.ProductsLinesRepository;
import org.code.productservices.repositories.ProductsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
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

    public List<ProductsResponse> getProducts(String q, Integer page, Integer size) {
        boolean isPageable = size != null && size > 0;
        boolean isQ = q != null && !q.isEmpty();

        List<Products> productsPage;

        if (isPageable && isQ)
            productsPage = productsRepository.findByProductNameContainingIgnoreCase(q, PageRequest.of(page, size)).getContent();
        else if (isPageable)
            productsPage = productsRepository.findAll(PageRequest.of(page, size)).getContent();
        else if (isQ)
            productsPage = productsRepository.findByProductNameContainingIgnoreCase(q);
        else
            productsPage = productsRepository.findAll();

        return productsPage.stream()
                .map(productsMapper::toResponse).toList();

    }

    public ProductsResponse getProduct(String productId) {
        return productsMapper.toResponse(
                productsRepository.findById(productId)
                        .orElseThrow(() -> new RuntimeException("Product not found"))
        );
    }
}
