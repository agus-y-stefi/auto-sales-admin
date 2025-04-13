package org.code.orderservices.services;

import org.code.orderservices.mappers.CustomersMapper;
import org.code.orderservices.repositories.CustomersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CustomersService {

    private final CustomersRepository customersRepository;
    private final CustomersMapper customersMapper;


    @Autowired
    public CustomersService(CustomersRepository customersRepository, CustomersMapper customersMapper) {
        this.customersRepository = customersRepository;
        this.customersMapper = customersMapper;
    }
}
