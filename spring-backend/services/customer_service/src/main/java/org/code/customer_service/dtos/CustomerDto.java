package org.code.customer_service.dtos;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
public class CustomerDto {

    @NotNull(message = "Customer number is required")
    private Integer customerNumber;

    @NotNull(message = "Customer name is required")
    private String customerName;

    @NotNull(message = "Contact first name is required")
    private String contactFirstName;

    @NotNull(message = "Contact last name is required")
    private String contactLastName;

    @NotNull(message = "Phone is required")
    private String phone;

    @NotNull(message = "City is required")
    private String city;

    @NotNull(message = "Country is required")
    private String country;

    @NotNull(message = "Credit limit is required")
    private BigDecimal creditLimit;
}