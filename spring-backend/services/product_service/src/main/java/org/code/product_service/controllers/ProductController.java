package org.code.product_service.controllers;

import lombok.RequiredArgsConstructor;
import org.code.product_service.dto.ProductDTO;
import org.code.product_service.dto.ProductDtoCreateUpdate;
import org.code.product_service.dto.ProductSummaryDTO;
import org.code.product_service.services.ProductService;
import org.code.product_service.specifications.criteria.ProductSearchCriteria;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.math.BigDecimal;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

    @GetMapping
    public ResponseEntity<Page<ProductDTO>> getAllProducts(
            @RequestParam(required = false) String productCode,
            @RequestParam(required = false) String productName,
            @RequestParam(required = false) String productLine,
            @RequestParam(required = false) String productScale,
            @RequestParam(required = false) String productVendor,
            @RequestParam(required = false) String productDescription,
            @RequestParam(required = false) Short minQuantityInStock,
            @RequestParam(required = false) Short maxQuantityInStock,
            @RequestParam(required = false) Boolean inStock,
            @RequestParam(required = false) BigDecimal minBuyPrice,
            @RequestParam(required = false) BigDecimal maxBuyPrice,
            @RequestParam(required = false) BigDecimal minMsrp,
            @RequestParam(required = false) BigDecimal maxMsrp,
            @RequestParam(required = false, defaultValue = "false") Boolean exactMatch,
            @RequestParam(required = false) Integer page,
            @RequestParam(required = false) Integer size,
            @RequestParam(required = false) String sortBy,
            @RequestParam(required = false) String sortDir
    ) {
        ProductSearchCriteria criteria = ProductSearchCriteria.builder()
                .productCode(productCode)
                .productName(productName)
                .productLine(productLine)
                .productScale(productScale)
                .productVendor(productVendor)
                .productDescription(productDescription)
                .minQuantityInStock(minQuantityInStock)
                .maxQuantityInStock(maxQuantityInStock)
                .inStock(inStock)
                .minBuyPrice(minBuyPrice)
                .maxBuyPrice(maxBuyPrice)
                .minMsrp(minMsrp)
                .maxMsrp(maxMsrp)
                .exactMatch(exactMatch)
                .build();

        return ResponseEntity.ok(
                productService.getAllProducts(
                        criteria,
                        productService.buildPageable(page, size, sortBy, sortDir)
                )
        );
    }

    @GetMapping("/summary")
    public ResponseEntity<Page<ProductSummaryDTO>> getAllProductsSummary(
            @RequestParam(required = false) String productCode,
            @RequestParam(required = false) String productName,
            @RequestParam(required = false) String productLine,
            @RequestParam(required = false) String productScale,
            @RequestParam(required = false) String productVendor,
            @RequestParam(required = false) String productDescription,
            @RequestParam(required = false) Short minQuantityInStock,
            @RequestParam(required = false) Short maxQuantityInStock,
            @RequestParam(required = false) Boolean inStock,
            @RequestParam(required = false) BigDecimal minBuyPrice,
            @RequestParam(required = false) BigDecimal maxBuyPrice,
            @RequestParam(required = false) BigDecimal minMsrp,
            @RequestParam(required = false) BigDecimal maxMsrp,
            @RequestParam(required = false, defaultValue = "false") Boolean exactMatch,
            @RequestParam(required = false) Integer page,
            @RequestParam(required = false) Integer size,
            @RequestParam(required = false) String sortBy,
            @RequestParam(required = false) String sortDir
    ) {
        ProductSearchCriteria criteria = ProductSearchCriteria.builder()
                .productCode(productCode)
                .productName(productName)
                .productLine(productLine)
                .productScale(productScale)
                .productVendor(productVendor)
                .productDescription(productDescription)
                .minQuantityInStock(minQuantityInStock)
                .maxQuantityInStock(maxQuantityInStock)
                .inStock(inStock)
                .minBuyPrice(minBuyPrice)
                .maxBuyPrice(maxBuyPrice)
                .minMsrp(minMsrp)
                .maxMsrp(maxMsrp)
                .exactMatch(exactMatch)
                .build();

        return ResponseEntity.ok(
                productService.getAllProductsSummary(
                        criteria,
                        productService.buildPageable(page, size, sortBy, sortDir)
                )
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductDTO> getProductById(@PathVariable String id) {
        ProductDTO product = productService.getProductById(id);
        return ResponseEntity.ok(product);
    }

    @PostMapping
    public ResponseEntity<ProductDTO> createProduct(@Valid @RequestBody ProductDtoCreateUpdate productDto) {
        ProductDTO createdProduct = productService.createProduct(productDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdProduct);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProductDTO> updateProduct(
            @PathVariable String id,
            @Valid @RequestBody ProductDtoCreateUpdate productDto
    ) {
        ProductDTO updatedProduct = productService.updateProduct(id, productDto);
        return ResponseEntity.ok(updatedProduct);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable String id) {
        productService.deleteProduct(id);
        return ResponseEntity.noContent().build();
    }
}
