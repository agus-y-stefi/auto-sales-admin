package org.code.orders_service.controllers;

import lombok.RequiredArgsConstructor;
import org.code.orders_service.dtos.PaymentDto;
import org.code.orders_service.dtos.PaymentDtoCreateUpdate;
import org.code.orders_service.services.PaymentService;
import org.code.orders_service.specifications.criteria.PaymentSearchCriteria;
import org.springframework.data.domain.Page;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/payments")
@RequiredArgsConstructor
public class PaymentController {

    private final PaymentService paymentService;

    @GetMapping
    public ResponseEntity<Page<PaymentDto>> getAllPayments(
            @RequestParam(required = false) Long orderNumber,
            @RequestParam(required = false) String checkNumber,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate paymentDateFrom,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate paymentDateTo,
            @RequestParam(required = false) BigDecimal minAmount,
            @RequestParam(required = false) BigDecimal maxAmount,
            @RequestParam(required = false, defaultValue = "false") Boolean exactMatch,
            @RequestParam(required = false) Integer page,
            @RequestParam(required = false) Integer size,
            @RequestParam(required = false) String sortBy,
            @RequestParam(required = false) String sortDir
    ) {
        PaymentSearchCriteria criteria = PaymentSearchCriteria.builder()
                .orderNumber(orderNumber)
                .checkNumber(checkNumber)
                .paymentDateFrom(paymentDateFrom)
                .paymentDateTo(paymentDateTo)
                .minAmount(minAmount)
                .maxAmount(maxAmount)
                .exactMatch(exactMatch)
                .build();

        return ResponseEntity.ok(
                paymentService.getAllPayments(
                        criteria,
                        paymentService.buildPageable(page, size, sortBy, sortDir)
                )
        );
    }

    @GetMapping("/by-order/{orderNumber}")
    public ResponseEntity<List<PaymentDto>> getPaymentsByOrderNumber(@PathVariable Long orderNumber) {
        List<PaymentDto> payments = paymentService.getPaymentsByOrderNumber(orderNumber);
        return ResponseEntity.ok(payments);
    }

    @GetMapping("/{orderNumber}/{checkNumber}")
    public ResponseEntity<PaymentDto> getPaymentById(
            @PathVariable Long orderNumber,
            @PathVariable String checkNumber) {
        PaymentDto payment = paymentService.getPaymentById(orderNumber, checkNumber);
        return ResponseEntity.ok(payment);
    }

    @PostMapping("/{orderNumber}/{checkNumber}")
    public ResponseEntity<PaymentDto> createPayment(
            @PathVariable Long orderNumber,
            @PathVariable String checkNumber,
            @RequestBody PaymentDtoCreateUpdate paymentDto) {
        PaymentDto createdPayment = paymentService.createPayment(orderNumber, checkNumber, paymentDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdPayment);
    }

    @PutMapping("/{orderNumber}/{checkNumber}")
    public ResponseEntity<PaymentDto> updatePayment(
            @PathVariable Long orderNumber,
            @PathVariable String checkNumber,
            @RequestBody PaymentDtoCreateUpdate paymentDto
    ) {
        PaymentDto updatedPayment = paymentService.updatePayment(orderNumber, checkNumber, paymentDto);
        return ResponseEntity.ok(updatedPayment);
    }

    @DeleteMapping("/{orderNumber}/{checkNumber}")
    public ResponseEntity<Void> deletePayment(
            @PathVariable Long orderNumber,
            @PathVariable String checkNumber) {
        paymentService.deletePayment(orderNumber, checkNumber);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/by-order/{orderNumber}")
    public ResponseEntity<Void> deletePaymentsByOrderNumber(@PathVariable Long orderNumber) {
        paymentService.deletePaymentsByOrderNumber(orderNumber);
        return ResponseEntity.noContent().build();
    }
}