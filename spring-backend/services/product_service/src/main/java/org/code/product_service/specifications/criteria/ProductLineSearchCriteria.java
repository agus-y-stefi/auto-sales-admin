package org.code.product_service.specifications.criteria;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ProductLineSearchCriteria {

    private String productLine;
    private String textDescription;
    private Boolean hasProducts; // true para líneas con productos, false para líneas sin productos
    
    // Parámetros para búsqueda de texto
    private Boolean exactMatch; // true para búsqueda exacta, false para LIKE

    // Constructor sin parámetros para usar con @Builder
    public ProductLineSearchCriteria() {
        this.exactMatch = false; // Por defecto búsqueda con LIKE
    }

    public ProductLineSearchCriteria(String productLine, String textDescription, 
                                   Boolean hasProducts, Boolean exactMatch) {
        this.productLine = productLine;
        this.textDescription = textDescription;
        this.hasProducts = hasProducts;
        this.exactMatch = exactMatch != null ? exactMatch : false;
    }
}
