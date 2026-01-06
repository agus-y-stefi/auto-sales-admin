package org.code.orders_service.clients.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CustomerNameDTO {
    private Long customerNumber;
    private String customerName;
}
