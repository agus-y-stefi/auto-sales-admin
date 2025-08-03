package org.code.customer_service.services;

import lombok.RequiredArgsConstructor;
import org.code.customer_service.dtos.OfficeDto;
import org.code.customer_service.mappers.OfficeMapper;
import org.code.customer_service.models.Office;
import org.code.customer_service.repositories.OfficeRepository;
import org.code.customer_service.specifications.OfficeSpecifications;
import org.code.customer_service.specifications.criteria.OfficeSearchCriteria;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import jakarta.persistence.EntityNotFoundException;

@Service
@RequiredArgsConstructor
public class OfficeService {

    private final OfficeRepository officeRepository;
    private final OfficeMapper officeMapper;

    public Page<OfficeDto> getAllOffices(OfficeSearchCriteria criteria, Pageable pageable) {
        boolean hasFilters = !OfficeSpecifications.hasNoFilters(
                criteria.getOfficeCode(), criteria.getCity(), criteria.getCountry(),
                criteria.getState(), criteria.getTerritory(), criteria.getPostalCode()
        );

        Specification<Office> spec = hasFilters
                ? OfficeSpecifications.withCriteria(criteria)
                : null;

        if (pageable != null) {
            return officeRepository.findAll(spec, pageable)
                    .map(officeMapper::toDto);
        } else {
            long count = hasFilters
                    ? officeRepository.count(spec)
                    : officeRepository.count();

            Pageable fullPage = this.buildPageable(0, (int) count, null, null);

            return officeRepository.findAll(spec, fullPage)
                    .map(officeMapper::toDto);
        }
    }

    public Page<OfficeDto> getAllOffices(OfficeSearchCriteria criteria) {
        // Delegar al método principal con pageable = null
        return getAllOffices(criteria, null);
    }

    public Page<OfficeDto> getAllOffices() {
        // Crear criteria vacío y delegar
        return getAllOffices(
                OfficeSearchCriteria
                        .builder()
                        .build()
        );
    }

    public OfficeDto getOfficeById(String officeCode) {
        return officeMapper.toDto(
                officeRepository.findById(officeCode)
                        .orElseThrow(() -> new EntityNotFoundException("Office not found with code: " + officeCode))
        );
    }

    public OfficeDto createOffice(OfficeDto officeDto) {
        // Validar que el código de oficina no exista ya
        if (officeRepository.existsById(officeDto.getOfficeCode())) {
            throw new IllegalArgumentException("Office with code " + officeDto.getOfficeCode() + " already exists");
        }

        Office office = officeMapper.toEntity(officeDto);
        Office savedOffice = officeRepository.save(office);
        return officeMapper.toDto(savedOffice);
    }

    public OfficeDto updateOffice(String officeCode, OfficeDto officeDto) {
        // Verificar que la oficina existe
        Office existingOffice = officeRepository.findById(officeCode)
                .orElseThrow(() -> new EntityNotFoundException("Office not found with code: " + officeCode));

        // Actualizar los campos (preservando el código original)
        Office officeToUpdate = officeMapper.toEntity(officeDto);
        officeToUpdate.setOfficeCode(officeCode); // Asegurar que mantenemos el código original

        return officeMapper.toDto(
                officeRepository.save(officeToUpdate)
        );
    }

    public void deleteOffice(String officeCode) {
        if (!officeRepository.existsById(officeCode)) {
            throw new EntityNotFoundException("Office not found with code: " + officeCode);
        }

        officeRepository.deleteById(officeCode);
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