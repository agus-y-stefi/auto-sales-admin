package org.code.orders_service.services;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class StadisticsService {

    private final OrderService orderService;
    private final PaymentService paymentService;
    private final OrderDetailService orderDetailService;



}
