package org.code.orderservices.repositories;

import org.code.orderservices.models.Orders;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository
public interface OrdersRepository extends JpaRepository<Orders,Integer> {

    @Query("SELECT o FROM Orders o WHERE o.customer.customerName LIKE %?1%")
    Optional<List<Orders>> findByCustomer_CustomerNameContain(String query);


    @Query("SELECT o FROM Orders o WHERE o.customer.customerName LIKE %?1%")
    Page<Orders> findByCustomer_CustomerNameContain(String query, Pageable pageable);
}
