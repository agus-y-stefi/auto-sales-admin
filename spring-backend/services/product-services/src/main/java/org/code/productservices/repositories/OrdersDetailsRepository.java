package org.code.productservices.repositories;

import org.code.productservices.dto.orders_details.OrderNumberSumPriceResponse;
import org.code.productservices.models.OrderDetails;
import org.code.productservices.models.serializers.OrderDetailsId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrdersDetailsRepository extends JpaRepository<OrderDetails, OrderDetailsId> {

    @Query("SELECT new org.code.productservices.dto.orders_details.OrderNumberSumPriceResponse(od.id.orderNumber,CAST(SUM(od.price_each * od.quantity_ordered) AS double)) FROM OrderDetails od GROUP BY od.id.orderNumber")
    List<OrderNumberSumPriceResponse> getAllOrderTotals();
}
