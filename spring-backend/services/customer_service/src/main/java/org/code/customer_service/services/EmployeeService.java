package org.code.customer_service.services;

import lombok.RequiredArgsConstructor;
import org.code.customer_service.dtos.EmployeeDto;
import org.code.customer_service.mappers.EmployeeMapper;
import org.code.customer_service.models.Employee;
import org.code.customer_service.repositories.EmployeeRepository;
import org.code.customer_service.specifications.EmployeeSpecifications;
import org.code.customer_service.specifications.criteria.EmployeeSearchCriteria;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import jakarta.persistence.EntityNotFoundException;

import java.util.List;

@Service
@RequiredArgsConstructor
public class EmployeeService {

    private final EmployeeRepository employeeRepository;
    private final EmployeeMapper employeeMapper;

    // Método original sin paginación (delega al método principal)
    public List<EmployeeDto> getAllEmployees() {
        // Crear criteria vacío y delegar
        EmployeeSearchCriteria emptyCriteria = EmployeeSearchCriteria.builder().build();
        return getAllEmployees(emptyCriteria);
    }

    // Método con criteria (delega al método principal)
    public List<EmployeeDto> getAllEmployees(EmployeeSearchCriteria criteria) {
        // Delegar al método principal con pageable = null
        Page<EmployeeDto> page = getAllEmployees(criteria, null);
        return page.getContent();
    }

    // Método principal con lógica en cascada
    public Page<EmployeeDto> getAllEmployees(EmployeeSearchCriteria criteria, Pageable pageable) {

        // Si no se proporciona Pageable, crear uno por defecto para obtener todos los elementos
        if (pageable == null) {
            long totalElements = getTotalCount(criteria);
            pageable = PageRequest.of(0, (int) totalElements);
        }

        // Si no hay filtros, buscar todos con paginación
        if (EmployeeSpecifications.hasNoFilters(
                criteria.getFirstName(), criteria.getLastName(),
                criteria.getExtension(), criteria.getOfficeCode()
        )) {
            return employeeRepository.findAll(pageable).map(employeeMapper::toDto);
        }

        // Buscar con filtros y paginación
        return employeeRepository.findAll(
                EmployeeSpecifications.withCriteria(criteria),
                pageable
        ).map(employeeMapper::toDto);
    }

    // Método auxiliar para obtener el total de elementos (para crear Pageable dinámico)
    private long getTotalCount(EmployeeSearchCriteria criteria) {
        if (EmployeeSpecifications.hasNoFilters(
                criteria.getFirstName(), criteria.getLastName(),
                criteria.getExtension(), criteria.getOfficeCode()
        )) {
            return employeeRepository.count();
        }

        return employeeRepository.count(EmployeeSpecifications.withCriteria(criteria));
    }

    public EmployeeDto getEmployeeById(Integer id) {
        return employeeMapper.toDto(
                employeeRepository.findById(id)
                        .orElseThrow(() -> new EntityNotFoundException("Employee not found with id: " + id))
        );
    }

    public EmployeeDto createEmployee(EmployeeDto employeeDto) {
        // Validar que no se envíe ID en la creación
        if (employeeDto.getEmployeeNumber() != null) {
            throw new IllegalArgumentException("Employee number should not be provided when creating a new employee");
        }

        // Convertir DTO a entidad (el mapper validará que exista la oficina)
        Employee employee = employeeMapper.toEntity(employeeDto);

        // Guardar en base de datos
        Employee savedEmployee = employeeRepository.save(employee);

        // Retornar DTO del empleado creado
        return employeeMapper.toDto(savedEmployee);
    }

    public EmployeeDto updateEmployee(Integer id, EmployeeDto employeeDto) {
        // Verificar que el empleado existe
        Employee existingEmployee = employeeRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Employee not found with id: " + id));

        // Actualizar los campos (preservando el ID original)
        Employee employeeToUpdate = employeeMapper.toEntity(employeeDto);
        employeeToUpdate.setEmployeeNumber(id); // Asegurar que mantenemos el ID original

        // Guardar cambios
        Employee updatedEmployee = employeeRepository.save(employeeToUpdate);

        // Retornar DTO actualizado
        return employeeMapper.toDto(updatedEmployee);
    }

    public void deleteEmployee(Integer id) {
        // Verificar que el empleado existe antes de eliminar
        if (!employeeRepository.existsById(id)) {
            throw new EntityNotFoundException("Employee not found with id: " + id);
        }

        // Eliminar el empleado
        employeeRepository.deleteById(id);
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