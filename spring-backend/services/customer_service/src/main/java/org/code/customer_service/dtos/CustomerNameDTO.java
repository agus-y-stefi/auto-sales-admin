package org.code.customer_service.dtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CustomerNameDTO {
    private Long customerNumber;
    private String customerName;
}
