package org.code.orders_service.repositories;

import org.code.orders_service.models.OrderDetail;
import org.code.orders_service.models.serializable.OrderDetailId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderDetailRepository extends JpaRepository<OrderDetail, OrderDetailId>, JpaSpecificationExecutor<OrderDetail> {

    List<OrderDetail> findByOrderNumber(Long orderNumber);
    void deleteByOrderNumber(Long orderNumber);
}