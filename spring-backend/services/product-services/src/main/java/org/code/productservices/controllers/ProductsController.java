package org.code.productservices.controllers;

import org.code.productservices.dto.products.ProductsRequest;
import org.code.productservices.dto.products.ProductsResponse;
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
    public ResponseEntity<List<ProductsResponse>> getProducts() {
        return ResponseEntity.ok(productsService.getProducts());
    }

    @GetMapping("/{productId}")
    public ResponseEntity<ProductsResponse> getProduct(@PathVariable Integer productId) {
        return ResponseEntity.ok(productsService.getProduct(productId));
    }

    @PostMapping
    public ResponseEntity<ProductsResponse> createProduct(@RequestBody ProductsRequest productsRequest) {
        return ResponseEntity.ok(productsService.createProduct(productsRequest));
    }

    @PutMapping("/{productId}")
    public ResponseEntity<ProductsResponse> updateProduct(@PathVariable Integer productId, @RequestBody ProductsRequest productsRequest) {
        return ResponseEntity.ok(productsService.updateProduct(productId, productsRequest));
    }

    @DeleteMapping("/{productId}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Integer productId) {
        productsService.deleteProduct(productId);
        return ResponseEntity.noContent().build();
    }




}
