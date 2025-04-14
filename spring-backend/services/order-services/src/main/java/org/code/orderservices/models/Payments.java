package org.code.orderservices.models;

import jakarta.persistence.*;
import lombok.*;
import org.code.orderservices.models.serializers.PaymentsId;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "payments")
public class Payments {

    @EmbeddedId
    private PaymentsId id;  // Usa el ID compuesto directamente

    @Column(name = "payment_date")
    private LocalDateTime paymentDate;

    @Column(name = "amount")
    private BigDecimal amount;


    @ManyToOne
    @MapsId("customerNumber")  // Usa la clave de producto en vez de order_number
    @JoinColumn(name = "customer_number", referencedColumnName = "customer_number", nullable = false)
    private Customers customer;

}
