package org.code.orders_service.models;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.code.orders_service.models.serializable.PaymentId;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "payments")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@IdClass(PaymentId.class)
public class Payment {

    @Id
    @Column(name = "order_number")
    private Long orderNumber;

    @Id
    @Column(name = "check_number", length = 50)
    private String checkNumber;

    @Column(name = "payment_date")
    private LocalDate paymentDate;

    @Column(name = "amount", precision = 10, scale = 2, nullable = false)
    private BigDecimal amount;

    // Relación muchos a uno con Order
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_number", insertable = false, updatable = false)
    private Order order;
}