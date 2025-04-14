package org.code.orderservices.controllers;

import org.code.orderservices.dto.payments.PaymentsRequest;
import org.code.orderservices.dto.payments.PaymentsResponse;
import org.code.orderservices.models.Payments;
import org.code.orderservices.models.serializers.PaymentsId;
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

    @GetMapping("/{paymentId}")
    public ResponseEntity<PaymentsResponse> getPaymentById(@PathVariable PaymentsId paymentId) {
        return ResponseEntity.ok(paymentsService.getPaymentById(paymentId));
    }

    @PostMapping
    public ResponseEntity<PaymentsResponse> createPayment(@RequestBody PaymentsRequest paymentsRequest) {
        return ResponseEntity.status(201)
                .body(paymentsService.createPayment(paymentsRequest));
    }

    @DeleteMapping
    public ResponseEntity<Void> deletePayment(@RequestParam PaymentsId paymentId) {
        paymentsService.deletePayment(paymentId);
        return ResponseEntity.noContent().build();
    }

}
