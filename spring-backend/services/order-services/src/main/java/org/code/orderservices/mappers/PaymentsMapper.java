package org.code.orderservices.mappers;

import org.code.orderservices.dto.payments.PaymentsRequest;
import org.code.orderservices.dto.payments.PaymentsResponse;
import org.code.orderservices.models.Payments;
import org.springframework.stereotype.Service;

@Service
public class PaymentsMapper implements IMapper<Payments, PaymentsRequest, PaymentsResponse> {

    @Override
    public Payments toEntity(PaymentsRequest request) {
        return null;
    }

    @Override
    public PaymentsResponse toResponse(Payments entity) {
        return null;
    }
}
