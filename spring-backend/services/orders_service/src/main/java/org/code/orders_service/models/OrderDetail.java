package org.code.orders_service.models;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.code.orders_service.models.serializable.OrderDetailId;

import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "orderdetails")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@IdClass(OrderDetailId.class)
public class OrderDetail {

    @Id
    @Column(name = "order_number")
    private Long orderNumber;

    @Id
    @Column(name = "product_code", length = 15)
    private String productCode;

    @Column(name = "quantity_ordered")
    private Long quantityOrdered;

    @Column(name = "price_each", precision = 10, scale = 2)
    private BigDecimal priceEach;

    // Relación muchos a uno con Order
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_number", insertable = false, updatable = false)
    private Order order;
}