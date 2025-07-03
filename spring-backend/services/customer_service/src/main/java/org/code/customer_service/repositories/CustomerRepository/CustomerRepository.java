package org.code.customer_service.repositories.CustomerRepository;

import org.code.customer_service.models.Customer;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerRepository extends JpaRepository<Customer, Integer> {

    Page<Customer> findCustomerByCustomerNameContainingIgnoreCase(String customerName, Pageable pageable);

}
