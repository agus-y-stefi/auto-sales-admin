package org.code.product_service.controllers;

import lombok.RequiredArgsConstructor;
import org.code.product_service.dto.*;
import org.code.product_service.services.ProductLineService;
import org.code.product_service.specifications.criteria.ProductLineSearchCriteria;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/product-lines")
@RequiredArgsConstructor
public class ProductLineController {

    private final ProductLineService productLineService;

    @Operation(summary = "List all product lines", description = "Returns a paginated list of product lines with optional filters")
    @GetMapping
    public ResponseEntity<CustomPagedDTO<ProductLineDTO>> getAllProductLines(
            @RequestParam(required = false) String productLine,
            @RequestParam(required = false) String textDescription,
            @RequestParam(required = false) Boolean hasProducts,
            @RequestParam(required = false, defaultValue = "false") Boolean exactMatch,
            @RequestParam(required = false) Integer page,
            @RequestParam(required = false) Integer size,
            @RequestParam(required = false) String sortBy,
            @RequestParam(required = false) String sortDir
    ) {
        ProductLineSearchCriteria criteria = ProductLineSearchCriteria.builder()
                .productLine(productLine)
                .textDescription(textDescription)
                .hasProducts(hasProducts)
                .exactMatch(exactMatch)
                .build();

        return ResponseEntity.ok(
                CustomPagedDTO.from(
                        productLineService.getAllProductLines(
                                criteria,
                                productLineService.buildPageable(page, size, sortBy, sortDir)
                        )
                )
        );
    }

    @Operation(summary = "Get product line by ID", description = "Retrieves a product line by its unique identifier")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Product line found"),
            @ApiResponse(responseCode = "404", description = "Product line not found", content = @Content(schema = @Schema(implementation = ApiErrorResponse.class)))
    })
    @GetMapping("/{id}")
    public ResponseEntity<ProductLineDTO> getProductLineById(@PathVariable String id) {
        ProductLineDTO productLine = productLineService.getProductLineById(id);
        return ResponseEntity.ok(productLine);
    }

    @PostMapping
    public ResponseEntity<ProductLineDTO> createProductLine(@Valid @RequestBody ProductLineDtoCreateUpdate productLineDto) {
        ProductLineDTO createdProductLine = productLineService.createProductLine(productLineDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdProductLine);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProductLineDTO> updateProductLine(
            @PathVariable String id,
            @Valid @RequestBody ProductLineDtoCreateUpdate productLineDto
    ) {
        ProductLineDTO updatedProductLine = productLineService.updateProductLine(id, productLineDto);
        return ResponseEntity.ok(updatedProductLine);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProductLine(@PathVariable String id) {
        productLineService.deleteProductLine(id);
        return ResponseEntity.noContent().build();
    }
}
