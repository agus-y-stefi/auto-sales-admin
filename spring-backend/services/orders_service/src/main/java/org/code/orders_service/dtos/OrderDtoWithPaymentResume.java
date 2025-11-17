package org.code.orders_service.dtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;


@Data
@Builder
@NoArgsConstructor
public class OrderDtoWithPaymentResume {

    private Long orderNumber;
    private LocalDate orderDate;
    private LocalDate requiredDate;
    private LocalDate shippedDate;
    private String status;
    private String comments;
    private Long customerNumber;
    private Long salesRepEmployeeNumber;
    private BigDecimal totalPaidAmount;
    private boolean isFullyPaid;
    private BigDecimal remainingAmount;

    public OrderDtoWithPaymentResume(Long orderNumber, LocalDate orderDate, LocalDate requiredDate, LocalDate shippedDate, String status, String comments, Long customerNumber, Long salesRepEmployeeNumber, BigDecimal totalPaidAmount, boolean isFullyPaid, BigDecimal remainingAmount) {
        this.orderNumber = orderNumber;
        this.orderDate = orderDate;
        this.requiredDate = requiredDate;
        this.shippedDate = shippedDate;
        this.status = status;
        this.comments = comments;
        this.customerNumber = customerNumber;
        this.salesRepEmployeeNumber = salesRepEmployeeNumber;
        this.totalPaidAmount = totalPaidAmount;
        this.isFullyPaid = isFullyPaid;
        this.remainingAmount = remainingAmount;
    }
}