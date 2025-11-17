package org.code.orders_service.repositories;

import org.code.orders_service.dtos.OrderDtoWithPaymentResume;
import org.code.orders_service.models.Order;
import org.code.orders_service.projections.OrderResumeProjection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long>, JpaSpecificationExecutor<Order> {

    @Query(value = """
            SELECT DISTINCT
                o.order_number AS orderNumber,
                o.order_date AS orderDate,
                o.required_date AS requiredDate,
                o.shipped_date AS shippedDate,
                o.status AS status,
                o.comments AS comments,
                o.customer_number AS customerNumber,
                o.sales_rep_employee_number AS salesRepEmployeeNumber,

                SUM(p.amount) OVER (PARTITION BY o.order_number) AS totalPaidAmount,
                SUM(od.quantity_ordered * od.price_each)
                    OVER (PARTITION BY o.order_number) AS totalOrderAmount,

                (
                    SUM(od.quantity_ordered * od.price_each)
                        OVER (PARTITION BY o.order_number)
                    -
                    COALESCE(SUM(p.amount) OVER (PARTITION BY o.order_number), 0)
                ) AS remainingAmount,

                CASE
                    WHEN COALESCE(SUM(p.amount) OVER (PARTITION BY o.order_number), 0)
                         >= SUM(od.quantity_ordered * od.price_each)
                              OVER (PARTITION BY o.order_number)
                    THEN TRUE
                    ELSE FALSE
                END AS isFullyPaid

            FROM orders_service.orders o
            LEFT JOIN orders_service.orderdetails od
                ON od.order_number = o.order_number
            LEFT JOIN orders_service.payments p
                ON p.order_number = o.order_number
            WHERE o.order_number = :orderNumber
            """,
            nativeQuery = true)
    OrderResumeProjection findOrderResume(@Param("orderNumber") Long orderNumber);

}