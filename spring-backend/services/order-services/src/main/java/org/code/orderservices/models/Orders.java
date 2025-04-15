package org.code.orderservices.models;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "orders")
public class Orders {

    @Id
    @Column(name = "order_number")
    private Integer orderNumber;

    @Column(name = "order_date")
    private LocalDateTime orderDate;

    @Column(name = "required_date")
    private LocalDateTime requiredDate;

    @Column(name = "shipped_date")
    private LocalDateTime shippedDate;

    @Column(name = "status")
    private String status;

    @Column(name = "comments")
    private String comments;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "customer_number", referencedColumnName = "customer_number", nullable = false)
    private Customers customer;

    @Column(name = "sales_rep_employee_number")
    private Integer saleRepEmployeeNumber;

}
