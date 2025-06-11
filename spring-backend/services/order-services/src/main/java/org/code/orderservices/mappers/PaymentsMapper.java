package org.code.orderservices.mappers;

import org.code.orderservices.dto.payments.PaymentsRequest;
import org.code.orderservices.dto.payments.PaymentsResponse;
import org.code.orderservices.models.Payments;
import org.code.orderservices.models.serializers.PaymentsId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PaymentsMapper implements IMapper<Payments, PaymentsRequest, PaymentsResponse> {

    private final CustomersMapper customersMapper;

    @Autowired
    public PaymentsMapper(CustomersMapper customersMapper) {
        this.customersMapper = customersMapper;
    }

    @Override
    public Payments toEntity(PaymentsRequest request) {
        return Payments.builder()
                .id(new PaymentsId(request.customerNumber(), request.checkNumber()))
                .paymentDate(request.paymentDate())
                .amount(request.amount())
                .build();
    }

    @Override
    public PaymentsResponse toResponse(Payments entity) {
        return new PaymentsResponse(
                customersMapper.toResponse(entity.getCustomer()),
                entity.getId().getCheckNumber(),
                entity.getPaymentDate(),
                entity.getAmount()
        );
    }
}
