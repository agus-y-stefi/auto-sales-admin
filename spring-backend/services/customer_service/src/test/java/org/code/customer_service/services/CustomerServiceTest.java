package org.code.customer_service.services;

import org.code.customer_service.dtos.CustomerDto;
import org.code.customer_service.mappers.CustomerMapper;
import org.code.customer_service.models.Customer;
import org.code.customer_service.repositories.CustomerRepository;
import org.code.customer_service.specifications.CustomerSpecifications;
import org.code.customer_service.specifications.criteria.CustomerSearchCriteria;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockedStatic;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
@DisplayName("CustomerService Tests")
class CustomerServiceTest {

    @Mock
    private CustomerRepository customerRepository;

    @Mock
    private CustomerMapper customerMapper;

    @InjectMocks
    private CustomerService customerService;

    private Customer sampleCustomer;
    private CustomerDto sampleCustomerDto;
    private List<Customer> sampleCustomers;

    @BeforeEach
    void setUp() {
        // Datos de prueba reutilizables
        sampleCustomer = Customer.builder()
                .customerNumber(1)
                .customerName("Test Customer")
                .contactFirstName("John")
                .contactLastName("Doe")
                .phone("+1-555-0123")
                .city("Madrid")
                .country("Spain")
                .creditLimit(new BigDecimal("10000.00"))
                .build();

        sampleCustomerDto = new CustomerDto(
                1, "Test Customer", "John", "Doe",
                "+1-555-0123", "Madrid", "Spain", new BigDecimal("10000.00"), "vip"
        );

        sampleCustomers = Arrays.asList(
                sampleCustomer,
                Customer.builder()
                        .customerNumber(2)
                        .customerName("Another Customer")
                        .city("Barcelona")
                        .country("Spain")
                        .build()
        );
    }

    // ========== TESTS SIN FILTROS ==========
    @Nested
    @DisplayName("Tests without Filters")
    class WithoutFiltersTests {

        @Test
        @DisplayName("Should return all customers when no filters and pageable provided")
        void getAllCustomers_WithoutFiltersAndWithPageable_ShouldReturnPagedResults() {
            // ARRANGE
            CustomerSearchCriteria emptyCriteria = CustomerSearchCriteria.builder().build();
            Pageable pageable = PageRequest.of(0, 10);
            Page<Customer> customerPage = new PageImpl<>(sampleCustomers, pageable, sampleCustomers.size());

            // Mock de CustomerSpecifications.hasNoFilters()
            try (MockedStatic<CustomerSpecifications> mockedSpecs = Mockito.mockStatic(CustomerSpecifications.class)) {
                mockedSpecs.when(() -> CustomerSpecifications.hasNoFilters(emptyCriteria))
                        .thenReturn(true);

                when(customerRepository.findAll((Specification<Customer>) null, pageable))
                        .thenReturn(customerPage);
                when(customerMapper.toDto(any(Customer.class)))
                        .thenReturn(sampleCustomerDto);

                // ACT
                Page<CustomerDto> result = customerService.getAllCustomers(emptyCriteria, pageable);

                // ASSERT
                assertThat(result).isNotNull();
                assertThat(result.getContent()).hasSize(2);
                assertThat(result.getTotalElements()).isEqualTo(2);
                assertThat(result.getNumber()).isEqualTo(0);
                assertThat(result.getSize()).isEqualTo(10);

                // Verificar interacciones
                verify(customerRepository).findAll((Specification<Customer>) null, pageable);
                verify(customerRepository, never()).count();
                verify(customerMapper, times(2)).toDto(any(Customer.class));
            }
        }

        @Test
        @DisplayName("Should return all customers without pagination when pageable is null")
        void getAllCustomers_WithoutFiltersAndWithoutPageable_ShouldReturnAllResults() {
            // ARRANGE
            CustomerSearchCriteria emptyCriteria = CustomerSearchCriteria.builder().build();
            long totalCount = 2L;
            Pageable fullPageable = PageRequest.of(0, (int) totalCount, Sort.unsorted());
            Page<Customer> customerPage = new PageImpl<>(sampleCustomers, fullPageable, totalCount);

            try (MockedStatic<CustomerSpecifications> mockedSpecs = Mockito.mockStatic(CustomerSpecifications.class)) {
                mockedSpecs.when(() -> CustomerSpecifications.hasNoFilters(emptyCriteria))
                        .thenReturn(true);

                when(customerRepository.count()).thenReturn(totalCount);
                when(customerRepository.findAll((Specification<Customer>) null, fullPageable))
                        .thenReturn(customerPage);
                when(customerMapper.toDto(any(Customer.class)))
                        .thenReturn(sampleCustomerDto);

                // ACT
                Page<CustomerDto> result = customerService.getAllCustomers(emptyCriteria, null);

                // ASSERT
                assertThat(result).isNotNull();
                assertThat(result.getContent()).hasSize(2);
                assertThat(result.getTotalElements()).isEqualTo(2);

                // Verificar que se consultó el count total
                verify(customerRepository).count();
                verify(customerRepository).findAll((Specification<Customer>) null, fullPageable);
                verify(customerMapper, times(2)).toDto(any(Customer.class));
            }
        }
    }

    // ========== TESTS CON FILTROS ==========
    @Nested
    @DisplayName("Tests with Filters")
    class WithFiltersTests {

        @Test
        @DisplayName("Should apply filters when criteria has filters and pageable provided")
        void getAllCustomers_WithFiltersAndWithPageable_ShouldReturnFilteredResults() {
            // ARRANGE
            CustomerSearchCriteria criteriaWithFilters = CustomerSearchCriteria.builder()
                    .build();

            Pageable pageable = PageRequest.of(0, 5);
            Page<Customer> filteredPage = new PageImpl<>(Arrays.asList(sampleCustomer), pageable, 1);

            try (MockedStatic<CustomerSpecifications> mockedSpecs = Mockito.mockStatic(CustomerSpecifications.class)) {
                mockedSpecs.when(() -> CustomerSpecifications.hasNoFilters(criteriaWithFilters))
                        .thenReturn(false);

                Specification<Customer> mockSpec = Mockito.mock(Specification.class);
                mockedSpecs.when(() -> CustomerSpecifications.withCriteria(criteriaWithFilters))
                        .thenReturn(mockSpec);

                when(customerRepository.findAll(eq(mockSpec), eq(pageable)))
                        .thenReturn(filteredPage);
                when(customerMapper.toDto(sampleCustomer))
                        .thenReturn(sampleCustomerDto);

                // ACT
                Page<CustomerDto> result = customerService.getAllCustomers(criteriaWithFilters, pageable);

                // ASSERT
                assertThat(result).isNotNull();
                assertThat(result.getContent()).hasSize(1);
                assertThat(result.getTotalElements()).isEqualTo(1);

                // Verificar que se usó la specification
                verify(customerRepository).findAll(eq(mockSpec), eq(pageable));
                verify(customerRepository, never()).count();
                verify(customerMapper).toDto(sampleCustomer);
            }
        }

        @Test
        @DisplayName("Should apply filters without pagination when pageable is null")
        void getAllCustomers_WithFiltersAndWithoutPageable_ShouldReturnAllFilteredResults() {
            // ARRANGE
            CustomerSearchCriteria criteriaWithFilters = CustomerSearchCriteria.builder()
                    .build();

            long filteredCount = 1L;
            Pageable fullPageable = PageRequest.of(0, (int) filteredCount, Sort.unsorted());
            Page<Customer> filteredPage = new PageImpl<>(Arrays.asList(sampleCustomer), fullPageable, filteredCount);

            try (MockedStatic<CustomerSpecifications> mockedSpecs = Mockito.mockStatic(CustomerSpecifications.class)) {
                mockedSpecs.when(() -> CustomerSpecifications.hasNoFilters(criteriaWithFilters))
                        .thenReturn(false);

                Specification<Customer> mockSpec = Mockito.mock(Specification.class);
                mockedSpecs.when(() -> CustomerSpecifications.withCriteria(criteriaWithFilters))
                        .thenReturn(mockSpec);

                when(customerRepository.count(mockSpec)).thenReturn(filteredCount);
                when(customerRepository.findAll(eq(mockSpec), eq(fullPageable)))
                        .thenReturn(filteredPage);
                when(customerMapper.toDto(sampleCustomer))
                        .thenReturn(sampleCustomerDto);

                // ACT
                Page<CustomerDto> result = customerService.getAllCustomers(criteriaWithFilters, null);

                // ASSERT
                assertThat(result).isNotNull();
                assertThat(result.getContent()).hasSize(1);
                assertThat(result.getTotalElements()).isEqualTo(1);

                // Verificar que se usó count con specification
                verify(customerRepository).count(mockSpec);
                verify(customerRepository).findAll(eq(mockSpec), eq(fullPageable));
                verify(customerMapper).toDto(sampleCustomer);
            }
        }
    }

    // ========== TESTS DE buildPageable ==========
    @Nested
    @DisplayName("buildPageable Method Tests")
    class BuildPageableTests {

        @Test
        @DisplayName("Should return null when size is null")
        void buildPageable_WithNullSize_ShouldReturnNull() {
            // ACT
            Pageable result = customerService.buildPageable(0, null, "customerName", "asc");

            // ASSERT
            assertThat(result).isNull();
        }

        @Test
        @DisplayName("Should create pageable with default page when page is null")
        void buildPageable_WithNullPage_ShouldUseDefaultPage() {
            // ACT
            Pageable result = customerService.buildPageable(null, 10, null, null);

            // ASSERT
            assertThat(result).isNotNull();
            assertThat(result.getPageNumber()).isEqualTo(0);
            assertThat(result.getPageSize()).isEqualTo(10);
            assertThat(result.getSort()).isEqualTo(Sort.unsorted());
        }

        @Test
        @DisplayName("Should create pageable with ascending sort")
        void buildPageable_WithAscendingSort_ShouldCreateCorrectPageable() {
            // ACT
            Pageable result = customerService.buildPageable(1, 5, "customerName", "asc");

            // ASSERT
            assertThat(result).isNotNull();
            assertThat(result.getPageNumber()).isEqualTo(1);
            assertThat(result.getPageSize()).isEqualTo(5);
            assertThat(result.getSort()).isEqualTo(Sort.by("customerName").ascending());
        }

        @Test
        @DisplayName("Should create pageable with descending sort")
        void buildPageable_WithDescendingSort_ShouldCreateCorrectPageable() {
            // ACT
            Pageable result = customerService.buildPageable(2, 20, "creditLimit", "desc");

            // ASSERT
            assertThat(result).isNotNull();
            assertThat(result.getPageNumber()).isEqualTo(2);
            assertThat(result.getPageSize()).isEqualTo(20);
            assertThat(result.getSort()).isEqualTo(Sort.by("creditLimit").descending());
        }

        @Test
        @DisplayName("Should create pageable with unsorted when sortBy is empty")
        void buildPageable_WithEmptySortBy_ShouldCreateUnsortedPageable() {
            // ACT
            Pageable result = customerService.buildPageable(0, 10, "", "asc");

            // ASSERT
            assertThat(result).isNotNull();
            assertThat(result.getSort()).isEqualTo(Sort.unsorted());
        }

        @Test
        @DisplayName("Should default to ascending when sortDir is invalid")
        void buildPageable_WithInvalidSortDir_ShouldDefaultToAscending() {
            // ACT
            Pageable result = customerService.buildPageable(0, 10, "customerName", "invalid");

            // ASSERT
            assertThat(result).isNotNull();
            assertThat(result.getSort()).isEqualTo(Sort.by("customerName").ascending());
        }
    }

    // ========== TESTS DE CASOS EDGE ==========
    @Nested
    @DisplayName("Edge Cases Tests")
    class EdgeCasesTests {

        @Test
        @DisplayName("Should handle empty results correctly")
        void getAllCustomers_WithEmptyResults_ShouldReturnEmptyPage() {
            // ARRANGE
            CustomerSearchCriteria emptyCriteria = CustomerSearchCriteria.builder().build();
            Pageable pageable = PageRequest.of(0, 10);
            Page<Customer> emptyPage = new PageImpl<>(Arrays.asList(), pageable, 0);

            try (MockedStatic<CustomerSpecifications> mockedSpecs = Mockito.mockStatic(CustomerSpecifications.class)) {
                mockedSpecs.when(() -> CustomerSpecifications.hasNoFilters(emptyCriteria))
                        .thenReturn(true);

                when(customerRepository.findAll((Specification<Customer>) null, pageable))
                        .thenReturn(emptyPage);

                // ACT
                Page<CustomerDto> result = customerService.getAllCustomers(emptyCriteria, pageable);

                // ASSERT
                assertThat(result).isNotNull();
                assertThat(result.getContent()).isEmpty();
                assertThat(result.getTotalElements()).isEqualTo(0);

                // No debería llamar al mapper si no hay elementos
                verify(customerMapper, never()).toDto(any(Customer.class));
            }
        }

        @Test
        @DisplayName("Should handle large count correctly when pageable is null")
        void getAllCustomers_WithLargeCountAndNullPageable_ShouldHandleCorrectly() {
            // ARRANGE
            CustomerSearchCriteria emptyCriteria = CustomerSearchCriteria.builder().build();
            long largeCount = 1000000L; // Un millón de registros
            Pageable fullPageable = PageRequest.of(0, (int) largeCount, Sort.unsorted());
            Page<Customer> largePage = new PageImpl<>(sampleCustomers, fullPageable, largeCount);

            try (MockedStatic<CustomerSpecifications> mockedSpecs = Mockito.mockStatic(CustomerSpecifications.class)) {
                mockedSpecs.when(() -> CustomerSpecifications.hasNoFilters(emptyCriteria))
                        .thenReturn(true);

                when(customerRepository.count()).thenReturn(largeCount);
                when(customerRepository.findAll((Specification<Customer>) null, fullPageable))
                        .thenReturn(largePage);
                when(customerMapper.toDto(any(Customer.class)))
                        .thenReturn(sampleCustomerDto);

                // ACT
                Page<CustomerDto> result = customerService.getAllCustomers(emptyCriteria, null);

                // ASSERT
                assertThat(result).isNotNull();
                assertThat(result.getTotalElements()).isEqualTo(largeCount);

                verify(customerRepository).count();
                verify(customerRepository).findAll((Specification<Customer>) null, fullPageable);
            }
        }
    }
}