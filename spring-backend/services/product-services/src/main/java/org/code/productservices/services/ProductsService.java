package org.code.productservices.services;

import jakarta.persistence.EntityNotFoundException;
import org.code.productservices.dto.products.ProductsCreateRequest;
import org.code.productservices.dto.products.ProductsResponse;
import org.code.productservices.dto.products.ProductsUpdateRequest;
import org.code.productservices.mappers.ProductsMapper;
import org.code.productservices.models.Products;
import org.code.productservices.models.ProductsLines;
import org.code.productservices.repositories.ProductsLinesRepository;
import org.code.productservices.repositories.ProductsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

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

    public ProductsResponse createProduct(ProductsCreateRequest productsCreateRequest) {

        if (productsRepository.existsById(productsCreateRequest.productCode()))
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Product already exists");

        ProductsLines productsLines = productsLinesRepository.findById(productsCreateRequest.productLine())
                .orElseThrow(() -> new EntityNotFoundException("Product line not found"));

        Products products = productsMapper.toEntity(productsCreateRequest);
        products.setProductsLine(productsLines);

        productsRepository.save(products);
        return productsMapper.toResponse(products);
    }


    public ProductsResponse updateProduct(String productId, ProductsUpdateRequest productsUpdateRequest) {
        Products products = productsRepository.findById(productId)
                .orElseThrow(() -> new EntityNotFoundException("Product not found"));

        ProductsLines productsLines = productsLinesRepository.findById(productsUpdateRequest.productLine())
                .orElseThrow(() -> new EntityNotFoundException("Product line not found"));

        products.setProductName(productsUpdateRequest.productName());
        products.setProductScale(productsUpdateRequest.productScale());
        products.setProductVendor(productsUpdateRequest.productVendor());
        products.setProductDescription(productsUpdateRequest.productDescription());
        products.setQuantityInStock(productsUpdateRequest.quantityInStock());
        products.setBuyPrice(productsUpdateRequest.buyPrice());
        products.setMSRP(productsUpdateRequest.MSRP());
        products.setProductsLine(productsLines);

        productsRepository.save(products);
        return productsMapper.toResponse(products);
    }


    public void deleteProduct(String productId) {
        Products products = productsRepository.findById(productId)
                .orElseThrow(() -> new EntityNotFoundException("Product not found"));

        productsRepository.delete(products);
    }
}
