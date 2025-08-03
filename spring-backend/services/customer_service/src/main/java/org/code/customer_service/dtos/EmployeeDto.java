package org.code.customer_service.dtos;

import jakarta.validation.constraints.*;
import lombok.*;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class EmployeeDto {

    private Integer employeeNumber;

    @NotBlank(message = "Last name is required")
    @Size(max = 100, message = "Last name must not exceed 100 characters")
    private String lastName;

    @NotBlank(message = "First name is required")
    @Size(max = 100, message = "First name must not exceed 100 characters")
    private String firstName;

    @NotBlank(message = "Extension is required")
    @Size(max = 10, message = "Extension must not exceed 10 characters")
    private String extension;

    @NotBlank(message = "Office code is required")
    private String officeCode;
}