package org.code.customer_service.models;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "offices")
public class Office {

    @Id
    @Column(name = "office_code")
    private String officeCode;

    @Column(name = "city", nullable = false)
    private String city;

    @Column(name = "phone", nullable = false)
    private String phone;

    @Column(name = "address_line1", nullable = false)
    private String addressLine1;

    @Column(name = "address_line2")
    private String addressLine2;

    @Column(name = "state")
    private String state;

    @Column(name = "country", nullable = false)
    private String country;

    @Column(name = "postal_code", nullable = false)
    private String postalCode;

    @Column(name = "territory", nullable = false)
    private String territory;

    @OneToMany(mappedBy = "office", cascade = CascadeType.ALL)
    private List<Employee> employees;
}
