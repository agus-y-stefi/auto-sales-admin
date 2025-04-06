package org.code.productservices.controllers;

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

}
