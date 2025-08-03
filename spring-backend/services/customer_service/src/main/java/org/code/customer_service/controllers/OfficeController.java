package org.code.customer_service.controllers;

import lombok.RequiredArgsConstructor;
import org.code.customer_service.dtos.OfficeDto;
import org.code.customer_service.services.OfficeService;
import org.code.customer_service.specifications.criteria.OfficeSearchCriteria;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/offices")
@RequiredArgsConstructor
public class OfficeController {

    private final OfficeService officeService;

    @GetMapping
    public ResponseEntity<Page<OfficeDto>> getAllOffices(
            @RequestParam(required = false) String officeCode,
            @RequestParam(required = false) String city,
            @RequestParam(required = false) String country,
            @RequestParam(required = false) String state,
            @RequestParam(required = false) String territory,
            @RequestParam(required = false) String postalCode,
            @RequestParam(required = false, defaultValue = "false") Boolean exactMatch,
            @RequestParam(required = false) Integer page,
            @RequestParam(required = false) Integer size,
            @RequestParam(required = false) String sortBy,
            @RequestParam(required = false) String sortDir
    ) {
        OfficeSearchCriteria criteria = OfficeSearchCriteria.builder()
                .officeCode(officeCode)
                .city(city)
                .country(country)
                .state(state)
                .territory(territory)
                .postalCode(postalCode)
                .exactMatch(exactMatch)
                .build();

        return ResponseEntity.ok(
                officeService.getAllOffices(
                        criteria,
                        officeService.buildPageable(page, size, sortBy, sortDir)
                )
        );
    }

    @GetMapping("/{officeCode}")
    public ResponseEntity<OfficeDto> getOfficeById(@PathVariable String officeCode) {
        OfficeDto office = officeService.getOfficeById(officeCode);
        return ResponseEntity.ok(office);
    }

    @PostMapping
    public ResponseEntity<OfficeDto> createOffice(@Valid @RequestBody OfficeDto officeDto) {
        OfficeDto createdOffice = officeService.createOffice(officeDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdOffice);
    }

    @PutMapping("/{officeCode}")
    public ResponseEntity<OfficeDto> updateOffice(
            @PathVariable String officeCode,
            @Valid @RequestBody OfficeDto officeDto) {
        OfficeDto updatedOffice = officeService.updateOffice(officeCode, officeDto);
        return ResponseEntity.ok(updatedOffice);
    }

    @DeleteMapping("/{officeCode}")
    public ResponseEntity<Void> deleteOffice(@PathVariable String officeCode) {
        officeService.deleteOffice(officeCode);
        return ResponseEntity.noContent().build();
    }
}