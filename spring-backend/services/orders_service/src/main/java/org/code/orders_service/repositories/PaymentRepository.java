package org.code.orders_service.repositories;

import org.code.orders_service.models.Payment;
import org.code.orders_service.models.serializable.PaymentId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, PaymentId>, JpaSpecificationExecutor<Payment> {

    List<Payment> findByOrderNumber(Long orderNumber);
    void deleteByOrderNumber(Long orderNumber);
}