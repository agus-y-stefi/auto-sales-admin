package org.code.productservices.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.code.productservices.models.serializers.OrderDetailsId;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.math.BigDecimal;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "order_details")
@EntityListeners(AuditingEntityListener.class)
public class OrderDetails {

    @EmbeddedId
    private OrderDetailsId id;  // Usa el ID compuesto directamente

    @ManyToOne
    @MapsId("productCode")  // Usa la clave de producto en vez de order_number
    @JoinColumn(name = "product_code", referencedColumnName = "product_code", nullable = false)
    private Products product;

    private Integer quantity_ordered;
    private BigDecimal price_each;
}
