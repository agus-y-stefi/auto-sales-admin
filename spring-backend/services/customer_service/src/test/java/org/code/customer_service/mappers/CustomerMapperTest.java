package org.code.customer_service.mappers;

import org.code.customer_service.dtos.CustomerDto;
import org.code.customer_service.dtos.CustomerDtoCreateUpdate;
import org.code.customer_service.models.Customer;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;


import java.math.BigDecimal;

import static org.assertj.core.api.Assertions.assertThat;


@DisplayName("CustomerMapper Tests")
class CustomerMapperTest {

    private CustomerMapper customerMapper;

    @BeforeEach
    void setUp() {
        customerMapper = new CustomerMapper();
    }

    @Nested
    @DisplayName("toDto(Customer) Tests")
    class ToDtoFromCustomerTests {

        @Test
        @DisplayName("Should map all fields correctly when customer has all data")
        void toDto_WithCompleteCustomer_ShouldMapAllFields() {
            // ARRANGE
            Customer customer = Customer.builder()
                    .customerNumber(12345)
                    .customerName("Acme Corporation")
                    .contactFirstName("John")
                    .contactLastName("Doe")
                    .phone("+1-555-0123")
                    .city("New York")
                    .country("USA")
                    .creditLimit(new BigDecimal("50000.00"))
                    .build();

            // ACT
            CustomerDto result = customerMapper.toDto(customer);

            // ASSERT
            assertThat(result).isNotNull();
            assertThat(result.getCustomerNumber()).isEqualTo(12345);
            assertThat(result.getCustomerName()).isEqualTo("Acme Corporation");
            assertThat(result.getContactFirstName()).isEqualTo("John");
            assertThat(result.getContactLastName()).isEqualTo("Doe");
            assertThat(result.getPhone()).isEqualTo("+1-555-0123");
            assertThat(result.getCity()).isEqualTo("New York");
            assertThat(result.getCountry()).isEqualTo("USA");
            assertThat(result.getCreditLimit()).isEqualByComparingTo("50000.00");
        }

        @Test
        @DisplayName("Should return null when customer is null")
        void toDto_WithNullCustomer_ShouldReturnNull() {
            // ARRANGE
            Customer customer = null;

            // ACT
            CustomerDto result = customerMapper.toDto(customer);

            // ASSERT
            assertThat(result).isNull();
        }

        @Test
        @DisplayName("Should handle customer with null fields")
        void toDto_WithCustomerHavingNullFields_ShouldMapCorrectly() {
            // ARRANGE
            Customer customer = Customer.builder()
                    .customerNumber(1)
                    .customerName("Basic Customer")
                    // Other fields are left as null
                    .build();

            // ACT
            CustomerDto result = customerMapper.toDto(customer);

            // ASSERT
            assertThat(result).isNotNull();
            assertThat(result.getCustomerNumber()).isEqualTo(1);
            assertThat(result.getCustomerName()).isEqualTo("Basic Customer");
            assertThat(result.getContactFirstName()).isNull();
            assertThat(result.getContactLastName()).isNull();
            assertThat(result.getPhone()).isNull();
            assertThat(result.getCity()).isNull();
            assertThat(result.getCountry()).isNull();
            assertThat(result.getCreditLimit()).isNull();
        }

        @Test
        @DisplayName("Should handle empty strings correctly")
        void toDto_WithEmptyStrings_ShouldMapCorrectly() {
            // ARRANGE
            Customer customer = Customer.builder()
                    .customerNumber(2)
                    .customerName("")
                    .contactFirstName("   ") // Solo espacios
                    .contactLastName("")
                    .phone("")
                    .city("")
                    .country("")
                    .creditLimit(BigDecimal.ZERO)
                    .build();

            // ACT
            CustomerDto result = customerMapper.toDto(customer);

            // ASSERT
            assertThat(result).isNotNull();
            assertThat(result.getCustomerName()).isEmpty();
            assertThat(result.getContactFirstName()).isEqualTo("   ");
            assertThat(result.getCreditLimit()).isEqualByComparingTo(BigDecimal.ZERO);
        }

    }

    // ========== TESTS PARA toEntity(CustomerDto) ==========
    @Nested
    @DisplayName("toEntity(CustomerDto) Tests")
    class ToEntityFromCustomerDtoTests {

        @Test
        @DisplayName("Should map all fields correctly from CustomerDto")
        void toEntity_WithCompleteCustomerDto_ShouldMapAllFields() {
            // ARRANGE
            CustomerDto customerDto = new CustomerDto(
                    99999,
                    "Test Company",
                    "Jane",
                    "Smith",
                    "+34-123-456-789",
                    "Madrid",
                    "Spain",
                    new BigDecimal("25000.50"),
                    "vip"
            );

            // ACT
            Customer result = customerMapper.toEntity(customerDto);

            // ASSERT
            assertThat(result).isNotNull();
            assertThat(result.getCustomerNumber()).isEqualTo(99999);
            assertThat(result.getCustomerName()).isEqualTo("Test Company");
            assertThat(result.getContactFirstName()).isEqualTo("Jane");
            assertThat(result.getContactLastName()).isEqualTo("Smith");
            assertThat(result.getPhone()).isEqualTo("+34-123-456-789");
            assertThat(result.getCity()).isEqualTo("Madrid");
            assertThat(result.getCountry()).isEqualTo("Spain");
            assertThat(result.getCreditLimit()).isEqualByComparingTo(new BigDecimal("25000.50"));
        }

        @Test
        @DisplayName("Should return null when CustomerDto is null")
        void toEntity_WithNullCustomerDto_ShouldReturnNull() {
            // ARRANGE
            CustomerDto customerDto = null;

            // ACT
            Customer result = customerMapper.toEntity(customerDto);

            // ASSERT
            assertThat(result).isNull();
        }
    }

    // ========== TESTS PARA toEntity(CustomerDtoCreateUpdate) ==========
    @Nested
    @DisplayName("toEntity(CustomerDtoCreateUpdate) Tests")
    class ToEntityFromCreateUpdateDtoTests {

        @Test
        @DisplayName("Should map all fields except customerNumber from CreateUpdate DTO")
        void toEntity_WithCustomerDtoCreateUpdate_ShouldMapFieldsWithoutCustomerNumber() {
            // ARRANGE
            CustomerDtoCreateUpdate createUpdateDto = CustomerDtoCreateUpdate.builder()
                    .customerName("New Company")
                    .contactFirstName("Alice")
                    .contactLastName("Johnson")
                    .phone("+44-20-7946-0958")
                    .city("London")
                    .country("UK")
                    .creditLimit(new BigDecimal("75000.00"))
                    .build();

            // ACT
            Customer result = customerMapper.toEntity(createUpdateDto);

            // ASSERT
            assertThat(result).isNotNull();
            // CustomerNumber NO debe estar seteado (es null para creación)
            assertThat(result.getCustomerNumber()).isNull();
            assertThat(result.getCustomerName()).isEqualTo("New Company");
            assertThat(result.getContactFirstName()).isEqualTo("Alice");
            assertThat(result.getContactLastName()).isEqualTo("Johnson");
            assertThat(result.getPhone()).isEqualTo("+44-20-7946-0958");
            assertThat(result.getCity()).isEqualTo("London");
            assertThat(result.getCountry()).isEqualTo("UK");
            assertThat(result.getCreditLimit()).isEqualByComparingTo(new BigDecimal("75000.00"));
        }

        @Test
        @DisplayName("Should return null when CustomerDtoCreateUpdate is null")
        void toEntity_WithNullCustomerDtoCreateUpdate_ShouldReturnNull() {
            // ARRANGE
            CustomerDtoCreateUpdate createUpdateDto = null;

            // ACT
            Customer result = customerMapper.toEntity(createUpdateDto);

            // ASSERT
            assertThat(result).isNull();
        }
    }

    // ========== TESTS DE CONSISTENCIA (ROUND-TRIP) ==========
    @Nested
    @DisplayName("Round-trip Mapping Tests")
    class RoundTripTests {

        @Test
        @DisplayName("Should maintain data consistency in round-trip mapping")
        void roundTripMapping_ShouldMaintainDataConsistency() {
            // ARRANGE
            Customer originalCustomer = Customer.builder()
                    .customerNumber(555)
                    .customerName("Round Trip Corp")
                    .contactFirstName("Bob")
                    .contactLastName("Wilson")
                    .phone("+1-800-TESTING")
                    .city("San Francisco")
                    .country("USA")
                    .creditLimit(new BigDecimal("100000.00"))
                    .build();

            // ACT - Customer -> DTO -> Customer
            CustomerDto dto = customerMapper.toDto(originalCustomer);
            Customer mappedBackCustomer = customerMapper.toEntity(dto);

            // ASSERT
            assertThat(mappedBackCustomer).isNotNull();
            assertThat(mappedBackCustomer.getCustomerNumber()).isEqualTo(originalCustomer.getCustomerNumber());
            assertThat(mappedBackCustomer.getCustomerName()).isEqualTo(originalCustomer.getCustomerName());
            assertThat(mappedBackCustomer.getContactFirstName()).isEqualTo(originalCustomer.getContactFirstName());
            assertThat(mappedBackCustomer.getContactLastName()).isEqualTo(originalCustomer.getContactLastName());
            assertThat(mappedBackCustomer.getPhone()).isEqualTo(originalCustomer.getPhone());
            assertThat(mappedBackCustomer.getCity()).isEqualTo(originalCustomer.getCity());
            assertThat(mappedBackCustomer.getCountry()).isEqualTo(originalCustomer.getCountry());
            assertThat(mappedBackCustomer.getCreditLimit()).isEqualByComparingTo(originalCustomer.getCreditLimit());
        }
    }

}