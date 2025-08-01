package org.code.customer_service.services;

import lombok.RequiredArgsConstructor;
import org.code.customer_service.dtos.CustomerDto;
import org.code.customer_service.dtos.CustomerDtoCreateUpdate;
import org.code.customer_service.mappers.CustomerMapper;
import org.code.customer_service.models.Customer;
import org.code.customer_service.repositories.CustomerRepository;
import org.code.customer_service.specifications.CustomerSpecifications;
import org.code.customer_service.specifications.criteria.CustomerSearchCriteria;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import jakarta.persistence.EntityNotFoundException;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CustomerService {

    private final CustomerRepository customerRepository;
    private final CustomerMapper customerMapper;



    public Page<CustomerDto> getAllCustomers(CustomerSearchCriteria criteria, Pageable pageable) {
        boolean hasFilters = !CustomerSpecifications.hasNoFilters(criteria);
        Specification<Customer> spec = hasFilters
                ? CustomerSpecifications.withCriteria(criteria)
                : null;

        if (pageable != null) {
            return customerRepository.findAll(spec, pageable)
                    .map(customerMapper::toDto);
        } else {
            long count = hasFilters
                    ? customerRepository.count(spec)
                    : customerRepository.count();

            Pageable fullPage = this.buildPageable(0, (int) count, null, null);

            return customerRepository.findAll(spec, fullPage)
                    .map(customerMapper::toDto);
        }
    }

    public Page<CustomerDto> getAllCustomers(CustomerSearchCriteria criteria) {
        // Delegar al método principal con pageable = null
        return getAllCustomers(criteria, null);
    }

    public Page<CustomerDto> getAllCustomers() {
        // Crear criteria vacío y delegar
        return getAllCustomers(
                CustomerSearchCriteria
                        .builder()
                        .build()
        );
    }

    public CustomerDto getCustomerById(Integer id) {
        return customerMapper.toDto(
                customerRepository.findById(id)
                        .orElseThrow(() -> new EntityNotFoundException("Customer not found with id: " + id))
        );
    }

    public CustomerDto createCustomer(CustomerDtoCreateUpdate customerDto) {
        Customer customer = customerMapper.toEntity(customerDto);
        Customer savedCustomer = customerRepository.save(customer);
        return customerMapper.toDto(savedCustomer);
    }

    public CustomerDto updateCustomer(Integer id, CustomerDtoCreateUpdate customerDto) {
        // Verificar que el cliente existe
        Customer originalCustomer = customerRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Customer not found with id: " + id));

        // Actualizar los campos (preservando el ID original)

        Customer customerUpdate = customerMapper.mergeUpdate(originalCustomer, customerDto);

        // Guardar cambios
        return customerMapper.toDto(
                customerRepository.save(customerUpdate)
        );
    }

    public void deleteCustomer(Integer id) {
        if (!customerRepository.existsById(id))
            throw new EntityNotFoundException("Customer not found with id: " + id);

        customerRepository.deleteById(id);
    }

    public Pageable buildPageable(Integer page, Integer size, String sortBy, String sortDir) {
        if (size == null) return null;

        int pageNumber = (page != null) ? page : 0;

        if (sortBy != null && !sortBy.trim().isEmpty()) {
            return PageRequest.of(
                    pageNumber,
                    size,
                    "desc".equalsIgnoreCase(sortDir)
                            ? Sort.by(sortBy).descending()
                            : Sort.by(sortBy).ascending()
            );
        }

        return PageRequest.of(pageNumber, size, Sort.unsorted());
    }
}
