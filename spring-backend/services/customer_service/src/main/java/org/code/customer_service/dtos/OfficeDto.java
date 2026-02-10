package org.code.customer_service.dtos;

import jakarta.validation.constraints.*;
import lombok.*;

@AllArgsConstructor
@Getter
@Setter
public class OfficeDto {

    @NotNull(message = "Office code is required")
    @NotBlank(message = "Office code is required")
    @Size(max = 10, message = "Office code must not exceed 10 characters")
    private String officeCode;

    @NotNull(message = "City is required")
    @NotBlank(message = "City is required")
    @Size(max = 100, message = "City must not exceed 100 characters")
    private String city;

    @NotNull(message = "Phone is required")
    @NotBlank(message = "Phone is required")
    @Pattern(regexp = "^[+]?[0-9\\s\\-\\(\\)]{7,20}$", message = "Phone number format is invalid")
    private String phone;

    @NotNull(message = "Address line 1 is required")
    @NotBlank(message = "Address line 1 is required")
    @Size(max = 255, message = "Address line 1 must not exceed 255 characters")
    private String addressLine1;

    @NotNull(message = "Country is required")
    @Size(max = 255, message = "Address line 2 must not exceed 255 characters")
    private String addressLine2;

    @NotNull(message = "State is required")
    @Size(max = 100, message = "State must not exceed 100 characters")
    private String state;

    @NotNull(message = "Country is required")
    @NotBlank(message = "Country is required")
    @Size(max = 100, message = "Country must not exceed 100 characters")
    private String country;

    @NotNull(message = "Postal code is required")
    @NotBlank(message = "Postal code is required")
    @Size(max = 20, message = "Postal code must not exceed 20 characters")
    private String postalCode;

    @NotNull(message = "Territory is required")
    @NotBlank(message = "Territory is required")
    @Size(max = 100, message = "Territory must not exceed 100 characters")
    private String territory;
}