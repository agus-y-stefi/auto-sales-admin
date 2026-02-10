package org.code.customer_service.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import jakarta.validation.constraints.*;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
public class CustomerDtoCreate {

    @NotBlank(message = "El nombre del cliente es obligatorio")
    @Size(max = 50, message = "El nombre del cliente no puede exceder 50 caracteres")
    private String customerName;

    @NotBlank(message = "El nombre del contacto es obligatorio")
    @Size(max = 50, message = "El nombre del contacto no puede exceder 50 caracteres")
    private String contactFirstName;

    @NotBlank(message = "El apellido del contacto es obligatorio")
    @Size(max = 50, message = "El apellido del contacto no puede exceder 50 caracteres")
    private String contactLastName;

    @NotBlank(message = "El teléfono es obligatorio")
    @Pattern(regexp = "^[+]?[0-9\\s\\-\\(\\)]{7,20}$", message = "El formato del teléfono no es válido")
    @Size(max = 50, message = "El teléfono no puede exceder 50 caracteres")
    private String phone;

    @NotBlank(message = "La ciudad es obligatoria")
    @Size(max = 50, message = "La ciudad no puede exceder 50 caracteres")
    private String city;

    @NotBlank(message = "El país es obligatorio")
    @Size(max = 50, message = "El país no puede exceder 50 caracteres")
    private String country;

    @DecimalMin(value = "0.01", message = "El límite de crédito debe ser mayor a cero")
    @Digits(integer = 8, fraction = 2, message = "El límite de crédito debe tener máximo 8 dígitos enteros y 2 decimales")
    private BigDecimal creditLimit;

}