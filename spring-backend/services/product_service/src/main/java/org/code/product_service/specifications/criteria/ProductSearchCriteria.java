package org.code.product_service.specifications.criteria;

import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;

@Data
@Builder
public class ProductSearchCriteria {

    private String productCode;
    private String productName;
    private String productLine;
    private String productScale;
    private String productVendor;
    private String productDescription;
    
    // Filtros por cantidad
    private Short minQuantityInStock;
    private Short maxQuantityInStock;
    private Boolean inStock; // true para productos con stock > 0
    
    // Filtros por precios
    private BigDecimal minBuyPrice;
    private BigDecimal maxBuyPrice;
    private BigDecimal minMsrp;
    private BigDecimal maxMsrp;
    
    // Parámetros para búsqueda de texto
    private Boolean exactMatch; // true para búsqueda exacta, false para LIKE

    // Constructor sin parámetros para usar con @Builder
    public ProductSearchCriteria() {
        this.exactMatch = false; // Por defecto búsqueda con LIKE
    }

    public ProductSearchCriteria(String productCode, String productName, String productLine,
                               String productScale, String productVendor, String productDescription,
                               Short minQuantityInStock, Short maxQuantityInStock, Boolean inStock,
                               BigDecimal minBuyPrice, BigDecimal maxBuyPrice,
                               BigDecimal minMsrp, BigDecimal maxMsrp, Boolean exactMatch) {
        this.productCode = productCode;
        this.productName = productName;
        this.productLine = productLine;
        this.productScale = productScale;
        this.productVendor = productVendor;
        this.productDescription = productDescription;
        this.minQuantityInStock = minQuantityInStock;
        this.maxQuantityInStock = maxQuantityInStock;
        this.inStock = inStock;
        this.minBuyPrice = minBuyPrice;
        this.maxBuyPrice = maxBuyPrice;
        this.minMsrp = minMsrp;
        this.maxMsrp = maxMsrp;
        this.exactMatch = exactMatch != null ? exactMatch : false;
    }
}
