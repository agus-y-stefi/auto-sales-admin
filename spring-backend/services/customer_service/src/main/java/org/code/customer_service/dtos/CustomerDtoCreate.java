package org.code.customer_service.dtos;

import lombok.AllArgsConstructor;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import jakarta.validation.constraints.*;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
public class CustomerDtoCreate {

    @Schema(description = "Name of the customer company", example = "Atelier graphique")
    @NotBlank(message = "El nombre del cliente es obligatorio")
    @Size(max = 50, message = "El nombre del cliente no puede exceder 50 caracteres")
    private String customerName;

    @Schema(description = "First name of the contact person", example = "Carine")
    @NotBlank(message = "El nombre del contacto es obligatorio")
    @Size(max = 50, message = "El nombre del contacto no puede exceder 50 caracteres")
    private String contactFirstName;

    @Schema(description = "Last name of the contact person", example = "Schmitt")
    @NotBlank(message = "El apellido del contacto es obligatorio")
    @Size(max = 50, message = "El apellido del contacto no puede exceder 50 caracteres")
    private String contactLastName;

    @Schema(description = "Phone number of the customer", example = "40.32.2555")
    @NotBlank(message = "El teléfono es obligatorio")
    @Pattern(regexp = "^[+]?[0-9\\s\\-\\(\\)]{7,20}$", message = "El formato del teléfono no es válido")
    @Size(max = 50, message = "El teléfono no puede exceder 50 caracteres")
    private String phone;

    @Schema(description = "City where the customer is located", example = "Nantes")
    @NotBlank(message = "La ciudad es obligatoria")
    @Size(max = 50, message = "La ciudad no puede exceder 50 caracteres")
    private String city;

    @Schema(description = "Country where the customer is located", example = "France")
    @NotBlank(message = "El país es obligatorio")
    @Size(max = 50, message = "El país no puede exceder 50 caracteres")
    private String country;

    @Schema(description = "Credit limit for the customer", example = "21000.00")
    @DecimalMin(value = "0.01", message = "El límite de crédito debe ser mayor a cero")
    @Digits(integer = 8, fraction = 2, message = "El límite de crédito debe tener máximo 8 dígitos enteros y 2 decimales")
    private BigDecimal creditLimit;

}