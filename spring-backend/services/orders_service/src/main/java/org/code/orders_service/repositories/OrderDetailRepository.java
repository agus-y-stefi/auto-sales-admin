package org.code.orders_service.repositories;

import org.code.orders_service.models.OrderDetail;
import org.code.orders_service.models.serializable.OrderDetailId;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderDetailRepository extends JpaRepository<OrderDetail, OrderDetailId>, JpaSpecificationExecutor<OrderDetail> {

    List<OrderDetail> findByOrderNumber(Long orderNumber);
    void deleteByOrderNumber(Long orderNumber);

    @Query("""
        SELECT d.order.orderNumber, SUM(d.priceEach * d.quantityOrdered)
        FROM OrderDetail d
        GROUP BY d.order.orderNumber
    """)
    List<Object[]> findAllOrderTotals();

    @Query("SELECT od.productCode " +
            "FROM OrderDetail od " +
            "JOIN od.order o " +
            "WHERE o.customerNumber = :customerId " +
            "GROUP BY od.productCode " +
            "ORDER BY COUNT(od) DESC")
    List<String> findTopProductsByCustomer(@Param("customerId") Long customerId, Pageable pageable);
}