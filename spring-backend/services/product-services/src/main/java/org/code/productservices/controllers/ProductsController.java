package org.code.productservices.controllers;

import org.code.productservices.dto.products.ProductsCreateRequest;
import org.code.productservices.dto.products.ProductsResponse;
import org.code.productservices.dto.products.ProductsUpdateRequest;
import org.code.productservices.services.ProductsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/products")
public class ProductsController {

    private final ProductsService productsService;

    @Autowired
    public ProductsController(ProductsService productsService) {
        this.productsService = productsService;
    }


    @GetMapping
    public ResponseEntity<List<ProductsResponse>> getProducts(
            @RequestParam(required = false) String q,
            @RequestParam(defaultValue = "0") Integer page,
            @RequestParam(required = false) Integer size
    ) {
        return ResponseEntity.ok(productsService.getProducts(q, page, size));
    }

    @GetMapping("/{productId}")
    public ResponseEntity<ProductsResponse> getProduct(@PathVariable String productId) {
        return ResponseEntity.ok(productsService.getProduct(productId));
    }

    @PostMapping
    public ResponseEntity<ProductsResponse> createProduct(@RequestBody ProductsCreateRequest productsCreateRequest) {
        return ResponseEntity.ok(productsService.createProduct(productsCreateRequest));
    }

    @PutMapping("/{productId}")
    public ResponseEntity<ProductsResponse> updateProduct(
            @PathVariable String productId,
            @RequestBody ProductsUpdateRequest productsCreateRequest
    ) {
        return ResponseEntity.ok(productsService.updateProduct(productId, productsCreateRequest));
    }

    @DeleteMapping("/{productId}")
    public ResponseEntity<Void> deleteProduct(@PathVariable String productId) {
        productsService.deleteProduct(productId);
        return ResponseEntity.noContent().build();
    }

}
