package org.code.orderservices.services;

import jakarta.persistence.EntityNotFoundException;
import org.code.orderservices.dto.payments.PaymentsRequest;
import org.code.orderservices.dto.payments.PaymentsResponse;
import org.code.orderservices.mappers.PaymentsMapper;
import org.code.orderservices.models.Customers;
import org.code.orderservices.models.Payments;
import org.code.orderservices.models.serializers.PaymentsId;
import org.code.orderservices.repositories.CustomersRepository;
import org.code.orderservices.repositories.PaymentsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class PaymentsService {

    private final PaymentsRepository paymentsRepository;
    private final CustomersRepository customersRepository;

    private final PaymentsMapper paymentsMapper;

    @Autowired
    public PaymentsService(PaymentsRepository paymentsRepository, CustomersRepository customersRepository, PaymentsMapper paymentsMapper) {
        this.paymentsRepository = paymentsRepository;
        this.customersRepository = customersRepository;
        this.paymentsMapper = paymentsMapper;
    }

    public List<PaymentsResponse> getAllPayments() {
        return paymentsRepository.findAll()
                .stream().map(paymentsMapper::toResponse)
                .toList();
    }

    public PaymentsResponse getPaymentById(Integer customerNumber, String checkNumber) {
        PaymentsId paymentsId = new PaymentsId(customerNumber, checkNumber);
        return paymentsMapper.toResponse(
                paymentsRepository.findById(paymentsId)
                        .orElseThrow(() -> new EntityNotFoundException("Payment not found with id: " + paymentsId))
        );
    }

    public PaymentsResponse createPayment(PaymentsRequest paymentsRequest) {
        Payments payments = paymentsMapper.toEntity(paymentsRequest);

        if (paymentsRepository.existsById(payments.getId()))
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Payment already exists with id: " + payments.getId());

        // Set the customer ID to the payment
        // buscar el cliente por id una vez que se configure el PaymentsRequest
        Customers c = customersRepository.findById(paymentsRequest.customerNumber())
                .orElseThrow(() -> new EntityNotFoundException("Customer not found with id: " + paymentsRequest.customerNumber()));

        payments.setCustomer(c);

        return paymentsMapper.toResponse(paymentsRepository.save(payments));
    }

    public void deletePayment(Integer customerNumber, String checkNumber) {
        Payments payments = paymentsRepository.findById(new PaymentsId(customerNumber, checkNumber))
                .orElseThrow(() -> new EntityNotFoundException("Payment not found with id: " + new PaymentsId(customerNumber, checkNumber)));

        paymentsRepository.delete(payments);
    }
}
