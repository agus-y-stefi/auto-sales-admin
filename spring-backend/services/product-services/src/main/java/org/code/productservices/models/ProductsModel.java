package org.code.productservices.models;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;

import java.math.BigDecimal;

@Data
@Entity
public class ProductsModel {

    @Id
    private Integer productCode;
    private String productName;
    private String productDescrption;
    private Integer quiantityInStock;
    private BigDecimal buyPrice;

}
