package org.code.orderservices.controllers;

import org.code.orderservices.dto.payments.PaymentsRequest;
import org.code.orderservices.dto.payments.PaymentsResponse;
import org.code.orderservices.services.PaymentsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/payments")
public class PaymentsController {

    private final PaymentsService paymentsService;

    @Autowired
    public PaymentsController(PaymentsService paymentsService) {
        this.paymentsService = paymentsService;
    }

    @GetMapping
    public ResponseEntity<List<PaymentsResponse>> getAllPayments() {
        return ResponseEntity.ok(paymentsService.getAllPayments());
    }

    @GetMapping("/{customer_number}/{check_number}")
    public ResponseEntity<PaymentsResponse> getPaymentById(
            @PathVariable("customer_number") Integer customerNumber,
            @PathVariable("check_number") String checkNumber) {
        return ResponseEntity.ok(paymentsService.getPaymentById(customerNumber, checkNumber));
    }

    @PostMapping
    public ResponseEntity<PaymentsResponse> createPayment(@RequestBody PaymentsRequest paymentsRequest) {
        return ResponseEntity.status(201)
                .body(paymentsService.createPayment(paymentsRequest));
    }

    @DeleteMapping("/{customer_number}/{check_number}")
    public ResponseEntity<Void> deletePayment(
            @PathVariable("customer_number") Integer customerNumber,
            @PathVariable("check_number") String checkNumber) {
        paymentsService.deletePayment(customerNumber, checkNumber);
        return ResponseEntity.noContent().build();
    }

}
