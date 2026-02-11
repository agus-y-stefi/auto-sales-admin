package org.code.customer_service.dtos;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

import java.util.Map;

@Data
@Builder
public class ApiErrorResponse {
    private LocalDateTime timestamp;
    private int status;
    private String error;
    private String message;
    private String path;
    // Map field name -> error message for validation errors
    private Map<String, String> validationErrors;
}
