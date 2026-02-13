package org.code.orders_service.dtos;

import lombok.Builder;
import lombok.Data;

import io.swagger.v3.oas.annotations.media.Schema;
import java.time.LocalDateTime;

import java.util.Map;

@Data
@Builder
@Schema(description = "Standard API Error Response")
public class ApiErrorResponse {
    @Schema(description = "Timestamp of the error", example = "2023-10-27T10:00:00")
    private LocalDateTime timestamp;

    @Schema(description = "HTTP Status code", example = "404")
    private int status;

    @Schema(description = "Error type", example = "Not Found")
    private String error;

    @Schema(description = "Detailed error message", example = "Customer not found with id: 1")
    private String message;

    @Schema(description = "Request path", example = "/api/customers/1")
    private String path;

    @Schema(description = "Validation errors map (field -> message)", example = "{\"email\": \"must be a well-formed email address\"}")
    private Map<String, String> validationErrors;
}
