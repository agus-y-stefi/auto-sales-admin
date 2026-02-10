package org.code.customer_service.dtos;

import jakarta.validation.constraints.*;
import lombok.*;

@AllArgsConstructor
@Getter
@Setter
public class EmployeeDto {

    @NotNull(message = "Employee number is required")
    private Integer employeeNumber;

    @NotNull(message = "Reports to is required")
    @NotBlank(message = "Last name is required")
    @Size(max = 100, message = "Last name must not exceed 100 characters")
    private String lastName;

    @NotBlank(message = "Job title is required")
    @NotBlank(message = "First name is required")
    @Size(max = 100, message = "First name must not exceed 100 characters")
    private String firstName;

    @NotBlank(message = "Extension is required")
    @Size(max = 10, message = "Extension must not exceed 10 characters")
    private String extension;

    @NotBlank(message = "Office code is required")
    private String officeCode;
}