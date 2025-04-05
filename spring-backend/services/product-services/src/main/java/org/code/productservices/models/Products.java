package org.code.productservices.models;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "products")
public class Products {

    @Id
    @Column(name = "product_code")
    private String productCode;

    @Column(name="product_name")
    private String productName;

    @Column(name="product_scale")
    private String productScale;

    @Column(name="product_vendor")
    private String productVendor;

    @Column(name="product_description")
    private String productDescription;

    @Column(name="quantity_in_stock")
    private Integer quantityInStock;

    @Column(name="buy_price")
    private BigDecimal buyPrice;

    @Column(name="msrp")
    private BigDecimal MSRP;

    @ManyToOne
    @JoinColumn(name = "product_line", nullable = false)
    private ProductsLines productsLine;


}
