package org.code.customer_service.mappers;

import org.code.customer_service.dtos.OfficeDto;
import org.code.customer_service.models.Office;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class OfficeMapper {

    public OfficeDto toDto(Office office) {
        if (office == null) {
            return null;
        }

        return OfficeDto.builder()
                .officeCode(office.getOfficeCode())
                .city(office.getCity())
                .phone(office.getPhone())
                .addressLine1(office.getAddressLine1())
                .addressLine2(office.getAddressLine2())
                .state(office.getState())
                .country(office.getCountry())
                .postalCode(office.getPostalCode())
                .territory(office.getTerritory())
                .build();
    }

    public Office toEntity(OfficeDto officeDto) {
        if (officeDto == null) {
            return null;
        }

        return Office.builder()
                .officeCode(officeDto.getOfficeCode())
                .city(officeDto.getCity())
                .phone(officeDto.getPhone())
                .addressLine1(officeDto.getAddressLine1())
                .addressLine2(officeDto.getAddressLine2())
                .state(officeDto.getState())
                .country(officeDto.getCountry())
                .postalCode(officeDto.getPostalCode())
                .territory(officeDto.getTerritory())
                .build();
    }

    public List<OfficeDto> toDtoList(List<Office> offices) {
        if (offices == null) {
            return null;
        }

        return offices.stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    public List<Office> toEntityList(List<OfficeDto> officeDtos) {
        if (officeDtos == null) {
            return null;
        }

        return officeDtos.stream()
                .map(this::toEntity)
                .collect(Collectors.toList());
    }
}