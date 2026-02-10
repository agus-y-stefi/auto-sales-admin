package org.code.product_service.models;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "products")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Product {
    
    @Id
    @Column(name = "product_code", length = 15)
    private String productCode;
    
    @Column(name = "product_name", length = 70)
    private String productName;
    
    @Column(name = "product_scale", length = 10)
    private String productScale;
    
    @Column(name = "product_vendor", length = 50)
    private String productVendor;
    
    @Column(name = "product_description", columnDefinition = "TEXT")
    private String productDescription;
    
    @Column(name = "quantity_in_stock")
    private Short quantityInStock;
    
    @Column(name = "buy_price", precision = 10, scale = 2)
    private BigDecimal buyPrice;
    
    @Column(name = "m_s_r_p", precision = 10, scale = 2)
    private BigDecimal msrp;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_line", referencedColumnName = "product_line")
    private ProductLine productLine;
}
