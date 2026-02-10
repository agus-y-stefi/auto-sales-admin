package org.code.product_service.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import jakarta.validation.constraints.*;
import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductDTO {
    
    @NotBlank(message = "Product code is required")
    @Size(max = 15, message = "Product code must not exceed 15 characters")
    private String productCode;
    
    @Size(max = 70, message = "Product name must not exceed 70 characters")
    private String productName;
    
    @Size(max = 50, message = "Product line must not exceed 50 characters")
    private String productLine;
    
    @Size(max = 10, message = "Product scale must not exceed 10 characters")
    private String productScale;
    
    @Size(max = 50, message = "Product vendor must not exceed 50 characters")
    private String productVendor;
    
    private String productDescription;
    
    @Min(value = 0, message = "Quantity in stock must be positive")
    @Max(value = 32767, message = "Quantity in stock exceeds maximum value")
    private Short quantityInStock;
    
    @DecimalMin(value = "0.00", message = "Buy price must be positive")
    @Digits(integer = 8, fraction = 2, message = "Buy price format is invalid")
    private BigDecimal buyPrice;
    
    @DecimalMin(value = "0.00", message = "MSRP must be positive")
    @Digits(integer = 8, fraction = 2, message = "MSRP format is invalid")
    private BigDecimal msrp;
    
    // Información adicional de la línea de producto para respuestas
    private String productLineDescription;
}
