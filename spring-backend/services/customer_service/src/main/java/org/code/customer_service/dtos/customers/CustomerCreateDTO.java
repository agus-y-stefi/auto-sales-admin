package org.code.customer_service.dtos.customers;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@AllArgsConstructor
@Getter
@Setter
public class CustomerCreateDTO {

    private String customerName;
    private String contactLastName;
    private String contactFirstName;
    private String phone;
    private String city;
    private String country;
    private BigDecimal creditLimit;

}
