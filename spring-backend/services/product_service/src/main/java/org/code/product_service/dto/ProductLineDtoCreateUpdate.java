package org.code.product_service.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductLineDtoCreateUpdate {
    
    @NotBlank(message = "Product line is required")
    @Size(max = 50, message = "Product line must not exceed 50 characters")
    private String productLine;
    
    @Size(max = 4000, message = "Description must not exceed 4000 characters")
    private String textDescription;
}
