package org.code.customer_service.dtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CustomerDto {

    private Integer customerNumber;
    private String customerName;
    private String contactFirstName;
    private String contactLastName;
    private String phone;
    private String city;
    private String country;
    private BigDecimal creditLimit;
}