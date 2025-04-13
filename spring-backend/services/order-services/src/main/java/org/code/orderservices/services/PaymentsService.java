package org.code.orderservices.services;

import org.code.orderservices.mappers.PaymentsMapper;
import org.code.orderservices.repositories.PaymentsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PaymentsService {

    private final PaymentsRepository paymentsRepository;
    private final PaymentsMapper paymentsMapper;

    @Autowired
    public PaymentsService(PaymentsRepository paymentsRepository, PaymentsMapper paymentsMapper) {
        this.paymentsRepository = paymentsRepository;
        this.paymentsMapper = paymentsMapper;
    }
}
