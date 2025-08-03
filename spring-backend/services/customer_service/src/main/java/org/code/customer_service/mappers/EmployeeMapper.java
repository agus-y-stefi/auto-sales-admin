package org.code.customer_service.mappers;

import lombok.RequiredArgsConstructor;
import org.code.customer_service.dtos.EmployeeDto;
import org.code.customer_service.models.Employee;
import org.code.customer_service.models.Office;
import org.code.customer_service.repositories.OfficeRepository;
import org.springframework.stereotype.Component;

import jakarta.persistence.EntityNotFoundException;
import java.util.List;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class EmployeeMapper {

    private final OfficeRepository officeRepository;

    public EmployeeDto toDto(Employee employee) {
        if (employee == null) {
            return null;
        }

        return EmployeeDto.builder()
                .employeeNumber(employee.getEmployeeNumber())
                .lastName(employee.getLastName())
                .firstName(employee.getFirstName())
                .extension(employee.getExtension())
                .officeCode(employee.getOffice() != null ? employee.getOffice().getOfficeCode() : null)
                .build();
    }

    public Employee toEntity(EmployeeDto employeeDto) {
        if (employeeDto == null) {
            return null;
        }

        // Buscar la oficina por código
        Office office = null;
        if (employeeDto.getOfficeCode() != null) {
            office = officeRepository.findById(employeeDto.getOfficeCode())
                    .orElseThrow(() -> new EntityNotFoundException("Office not found with code: " + employeeDto.getOfficeCode()));
        }

        return Employee.builder()
                .employeeNumber(employeeDto.getEmployeeNumber())
                .lastName(employeeDto.getLastName())
                .firstName(employeeDto.getFirstName())
                .extension(employeeDto.getExtension())
                .office(office)
                .build();
    }

    public List<EmployeeDto> toDtoList(List<Employee> employees) {
        if (employees == null) {
            return null;
        }

        return employees.stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    public List<Employee> toEntityList(List<EmployeeDto> employeeDtos) {
        if (employeeDtos == null) {
            return null;
        }

        return employeeDtos.stream()
                .map(this::toEntity)
                .collect(Collectors.toList());
    }
}