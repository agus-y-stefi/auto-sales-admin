package org.code.orderservices.services;

import jakarta.persistence.EntityNotFoundException;
import org.code.orderservices.dto.payments.PaymentsRequest;
import org.code.orderservices.dto.payments.PaymentsResponse;
import org.code.orderservices.mappers.PaymentsMapper;
import org.code.orderservices.models.Payments;
import org.code.orderservices.models.serializers.PaymentsId;
import org.code.orderservices.repositories.PaymentsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PaymentsService {

    private final PaymentsRepository paymentsRepository;
    private final PaymentsMapper paymentsMapper;

    @Autowired
    public PaymentsService(PaymentsRepository paymentsRepository, PaymentsMapper paymentsMapper) {
        this.paymentsRepository = paymentsRepository;
        this.paymentsMapper = paymentsMapper;
    }

    public List<PaymentsResponse> getAllPayments() {
        return paymentsRepository.findAll()
                .stream().map(paymentsMapper::toResponse)
                .toList();
    }

    public PaymentsResponse getPaymentById(PaymentsId paymentId) {
        return paymentsMapper.toResponse(
                paymentsRepository.findById(paymentId)
                        .orElseThrow(() -> new EntityNotFoundException("Payment not found with id: " + paymentId))
        );
    }

    public PaymentsResponse createPayment(PaymentsRequest paymentsRequest) {
        Payments payments = paymentsMapper.toEntity(paymentsRequest);

        // Set the customer ID to the payment
        // buscar el cliente por id una vez que se configure el PaymentsRequest

        return paymentsMapper.toResponse(paymentsRepository.save(payments));
    }

    public void deletePayment(PaymentsId paymentId) {
        Payments payments = paymentsRepository.findById(paymentId)
                .orElseThrow(() -> new EntityNotFoundException("Payment not found with id: " + paymentId));

        paymentsRepository.delete(payments);
    }
}
