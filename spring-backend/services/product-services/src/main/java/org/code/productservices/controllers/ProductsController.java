package org.code.productservices.controllers;

import org.code.productservices.dto.products.ProductsResponse;
import org.code.productservices.services.ProductsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

}
