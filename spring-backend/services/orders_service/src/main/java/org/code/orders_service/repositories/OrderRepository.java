package org.code.orders_service.repositories;

import org.code.orders_service.models.Order;
import org.code.orders_service.projection.CustomersStatsProjection;
import org.code.orders_service.projection.OrderSumaryProjection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long>, JpaSpecificationExecutor<Order> {

    @Query(value = """
            WITH order_totals AS (
                SELECT 
                    order_number,
                    SUM(price_each * quantity_ordered) as total
                FROM orders_service.orderdetails
                GROUP BY order_number
            ),
            payment_totals AS (
                SELECT 
                    order_number,
                    SUM(amount) as pagado
                FROM orders_service.payments
                GROUP BY order_number
            )
            SELECT 
                o.order_number as orderNumber,
                o.order_date as orderDate,
                o.required_date as requiredDate,
                o.shipped_date as shippedDate,
                o.status,
                o.customer_number as customerNumber,
                o.sales_rep_employee_number as salesRepEmployeeNumber,
                ot.total as totalOrden,
                COALESCE(pt.pagado, 0) as totalPagado
            FROM orders_service.orders o
            JOIN order_totals ot ON o.order_number = ot.order_number
            LEFT JOIN payment_totals pt ON o.order_number = pt.order_number
            WHERE o.customer_number = :customerNumber
            ORDER BY o.order_date DESC
            LIMIT :size
            """, nativeQuery = true)
    List<OrderSumaryProjection> findRecentOrdersWithTotals(@Param("size") int size, @Param("customerNumber") Long customerNumber);

    @Query(value = """
            WITH order_totals AS (
                SELECT 
                    o.order_number,
                    o.status,
                    order_date,
                    SUM(od.price_each * od.quantity_ordered) as total_orden
                FROM orders_service.orders o
                JOIN orders_service.orderdetails od ON o.order_number = od.order_number
                WHERE o.customer_number = :customerId
                GROUP BY o.order_number, o.status, order_date
            ),
            payment_total AS (
                SELECT COALESCE(SUM(amount), 0) as total
                FROM orders_service.payments
                       WHERE order_number IN (select order_number from orders_service.orders where customer_number = :customerId)
            
            )
            SELECT 
                COUNT(*)                                              as cantidadOrdenes,
                COUNT(*) FILTER (WHERE status IN ('Shipped', 'Resolved')) as ordenesCompletadas,
                COALESCE(AVG(total_orden), 0)                        as precioPromedio,
                COALESCE(SUM(total_orden), 0)                        as totalOrden,
                (SELECT total FROM payment_total)                    as totalPagado,
                MAX(order_totals.order_date)                         as ultimaOrdenFecha
            FROM order_totals
            """, nativeQuery = true)
    CustomersStatsProjection getDashboardSummary(@Param("customerId") Long customerId);
}