package org.code.orderservices.repositories;

import org.code.orderservices.models.Payments;
import org.code.orderservices.models.serializers.PaymentsId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PaymentsRepository extends JpaRepository<Payments, PaymentsId> {
}
