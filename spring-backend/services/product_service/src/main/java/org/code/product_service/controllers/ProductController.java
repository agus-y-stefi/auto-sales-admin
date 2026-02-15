package org.code.product_service.controllers;

import lombok.RequiredArgsConstructor;
import org.code.product_service.dto.*;
import org.code.product_service.services.ProductService;
import org.code.product_service.specifications.criteria.ProductSearchCriteria;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;

import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

    @Operation(summary = "List all products", description = "Returns a paginated list of products with optional filters")
    @GetMapping
    public ResponseEntity<CustomPagedDTO<ProductDTO>> getAllProducts(
            @RequestParam(required = false) String q,
            @RequestParam(required = false) String productLine,
            @RequestParam(required = false) String productVendor,
            @RequestParam(required = false) String productScale,
            @RequestParam(required = false) Integer page,
            @RequestParam(required = false) Integer size,
            @RequestParam(required = false) String sortBy,
            @RequestParam(required = false) String sortDir
    ) {
        ProductSearchCriteria criteria = ProductSearchCriteria.builder()
                .q(q)
                .productLine(productLine)
                .productVendor(productVendor)
                .productScale(productScale)
                .build();

        return ResponseEntity.ok(
                CustomPagedDTO.from(
                        productService.getAllProducts(
                                criteria,
                                productService.buildPageable(page, size, sortBy, sortDir)
                        )
                )
        );
    }

    @Operation(summary = "List products summary", description = "Returns a paginated summary list (fewer fields) with optional filters")
    @GetMapping("/summary")
    public ResponseEntity<CustomPagedDTO<ProductSummaryDTO>> getAllProductsSummary(
            @RequestParam(required = false) String q,
            @RequestParam(required = false) String productLine,
            @RequestParam(required = false) String productVendor,
            @RequestParam(required = false) String productScale,
            @RequestParam(required = false) Integer page,
            @RequestParam(required = false) Integer size,
            @RequestParam(required = false) String sortBy,
            @RequestParam(required = false) String sortDir
    ) {
        ProductSearchCriteria criteria = ProductSearchCriteria.builder()
                .q(q)
                .productLine(productLine)
                .productVendor(productVendor)
                .productScale(productScale)
                .build();

        return ResponseEntity.ok(
                CustomPagedDTO.from(
                        productService.getAllProductsSummary(
                                criteria,
                                productService.buildPageable(page, size, sortBy, sortDir)
                        )
                )
        );
    }

    @Operation(summary = "Get product by code", description = "Retrieves a product by its unique code")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Product found", content = @Content(schema = @Schema(implementation = ProductDTO.class))),
            @ApiResponse(responseCode = "404", description = "Product not found", content = @Content(schema = @Schema(implementation = ApiErrorResponse.class)))
    })
    @GetMapping("/{id}")
    public ResponseEntity<ProductDTO> getProductById(@PathVariable String id) {
        ProductDTO product = productService.getProductById(id);
        return ResponseEntity.ok(product);
    }

    @Operation(summary = "Create a new product", description = "Creates a new product with the provided details")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Product created successfully"),
            @ApiResponse(responseCode = "400", description = "Invalid input data", content = @Content(schema = @Schema(implementation = ApiErrorResponse.class)))
    })
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


    @GetMapping("/bulk")
    public ResponseEntity<List<ProductDTO>> getBulkProducts(
            @RequestParam List<String> ids) { // Spring parsea la coma automáticamente

        List<ProductDTO> products = productService.getBulkProducts(ids);
        return ResponseEntity.ok(products);
    }
}
