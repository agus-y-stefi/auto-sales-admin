package org.code.productservices.models.serializers;

import java.io.Serializable;
import java.util.Objects;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Embeddable
public class OrderDetailsId implements Serializable {

    @Column(name = "order_number")
    private Integer orderNumber;

    @Column(name = "product_code")
    private String productCode;

    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null || getClass() != obj.getClass()) return false;
        OrderDetailsId that = (OrderDetailsId) obj;
        return Objects.equals(orderNumber, that.getOrderNumber()) && Objects.equals(productCode, that.getProductCode());
    }

    @Override
    public int hashCode() {
        return Objects.hash(orderNumber, productCode);
    }
}