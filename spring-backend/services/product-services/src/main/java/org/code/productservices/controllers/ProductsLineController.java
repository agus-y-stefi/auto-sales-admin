package org.code.productservices.controllers;

import org.code.productservices.dto.products_lines.ProductsLinesCreateRequest;
import org.code.productservices.dto.products_lines.ProductsLinesResponse;
import org.code.productservices.dto.products_lines.ProductsLinesUpdateRequest;
import org.code.productservices.services.ProductsLinesService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/products_lines")
public class ProductsLineController {

    private final ProductsLinesService productsLinesService;

    public ProductsLineController(ProductsLinesService productsLinesService) {
        this.productsLinesService = productsLinesService;
    }

    @GetMapping
    public ResponseEntity<List<ProductsLinesResponse>> getProductsLines() {
        return ResponseEntity.ok(productsLinesService.getProductsLines());
    }

    @GetMapping("/{product_line}")
    public ResponseEntity<ProductsLinesResponse> getProductsLineById(@PathVariable String product_line) {
        return ResponseEntity.ok(productsLinesService.getProductsLineById(product_line));
    }

    @PostMapping
    public ResponseEntity<ProductsLinesResponse> createProductsLine(@RequestBody ProductsLinesCreateRequest productsLines) {
        return ResponseEntity.status(HttpStatus.CREATED).body(productsLinesService.createProductsLine(productsLines));
    }

    @PutMapping("/{product_line}")
    public ResponseEntity<ProductsLinesResponse> updateProductsLine(@PathVariable String product_line, @RequestBody ProductsLinesUpdateRequest productsLines) {
        return ResponseEntity.ok(productsLinesService.updateProductsLine(product_line, productsLines));
    }

    @DeleteMapping("/{product_line}")
    public ResponseEntity<Void> deleteProductsLine(@PathVariable String product_line) {
        productsLinesService.deleteProductsLine(product_line);
        return ResponseEntity.noContent().build();
    }
}
