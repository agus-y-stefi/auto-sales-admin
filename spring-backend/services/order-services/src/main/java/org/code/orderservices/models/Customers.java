package org.code.orderservices.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;

import java.math.BigDecimal;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "customers")
public class Customers {

    @Id
    @Column(name = "customer_number")
    private Integer customerNumber;

    @Column(name = "customer_name")
    private String customerName;

    @Column(name = "contact_last_name")
    private String contactLastName;

    @Column(name = "contact_first_name")
    private String contactFirstName;

    @Column(name = "phone")
    private String phone;

    @Column(name = "city")
    private String city;

    @Column(name = "country")
    private String country;

    @Column(name = "credit_limit")
    private BigDecimal creditLimit;
}
