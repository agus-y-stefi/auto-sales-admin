package org.code.product_service.specifications.criteria;

import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;

@Data
@Builder
public class ProductSearchCriteria {

    private String q;
    
    public ProductSearchCriteria(String q) {
        this.q = q;
    }
}
