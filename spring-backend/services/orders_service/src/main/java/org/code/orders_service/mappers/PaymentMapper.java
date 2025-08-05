package org.code.orders_service.mappers;

import org.code.orders_service.dtos.PaymentDto;
import org.code.orders_service.dtos.PaymentDtoCreateUpdate;
import org.code.orders_service.models.Payment;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PaymentMapper {

    public PaymentDto toDto(Payment payment) {
        if (payment == null) {
            return null;
        }

        return PaymentDto.builder()
                .orderNumber(payment.getOrderNumber())
                .checkNumber(payment.getCheckNumber())
                .paymentDate(payment.getPaymentDate())
                .amount(payment.getAmount())
                .build();
    }

    public Payment toEntity(PaymentDto paymentDto) {
        if (paymentDto == null) {
            return null;
        }

        return Payment.builder()
                .orderNumber(paymentDto.getOrderNumber())
                .checkNumber(paymentDto.getCheckNumber())
                .paymentDate(paymentDto.getPaymentDate())
                .amount(paymentDto.getAmount())
                .build();
    }

    public Payment toEntity(PaymentDtoCreateUpdate paymentDtoCreateUpdate, Long orderNumber, String checkNumber) {
        if (paymentDtoCreateUpdate == null) {
            return null;
        }

        return Payment.builder()
                .orderNumber(orderNumber)
                .checkNumber(checkNumber)
                .paymentDate(paymentDtoCreateUpdate.getPaymentDate())
                .amount(paymentDtoCreateUpdate.getAmount())
                .build();
    }

    public List<PaymentDto> toDtoList(List<Payment> payments) {
        if (payments == null) {
            return null;
        }

        return payments.stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    public List<Payment> toEntityList(List<PaymentDto> paymentDtos) {
        if (paymentDtos == null) {
            return null;
        }

        return paymentDtos.stream()
                .map(this::toEntity)
                .collect(Collectors.toList());
    }

    public Payment mergeUpdate(Payment originalPayment, PaymentDtoCreateUpdate paymentToUpdate) {
        if (originalPayment == null || paymentToUpdate == null) {
            return originalPayment;
        }

        if (paymentToUpdate.getPaymentDate() != null) {
            originalPayment.setPaymentDate(paymentToUpdate.getPaymentDate());
        }
        if (paymentToUpdate.getAmount() != null) {
            originalPayment.setAmount(paymentToUpdate.getAmount());
        }

        return originalPayment;
    }
}