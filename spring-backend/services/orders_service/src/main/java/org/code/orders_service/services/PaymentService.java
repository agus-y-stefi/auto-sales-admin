package org.code.orders_service.services;

import lombok.RequiredArgsConstructor;
import org.code.orders_service.dtos.PaymentDto;
import org.code.orders_service.dtos.PaymentDtoCreateUpdate;
import org.code.orders_service.mappers.PaymentMapper;
import org.code.orders_service.models.Payment;
import org.code.orders_service.models.serializable.PaymentId;
import org.code.orders_service.repositories.PaymentRepository;
import org.code.orders_service.specifications.PaymentSpecifications;
import org.code.orders_service.specifications.criteria.PaymentSearchCriteria;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PaymentService {

    private final PaymentRepository paymentRepository;
    private final PaymentMapper paymentMapper;

    public Page<PaymentDto> getAllPayments(PaymentSearchCriteria criteria, Pageable pageable) {
        boolean hasFilters = !PaymentSpecifications.hasNoFilters(criteria);
        Specification<Payment> spec = hasFilters
                ? PaymentSpecifications.withCriteria(criteria)
                : null;

        if (pageable != null) {
            return paymentRepository.findAll(spec, pageable)
                    .map(paymentMapper::toDto);
        } else {
            long count = hasFilters
                    ? paymentRepository.count(spec)
                    : paymentRepository.count();

            Pageable fullPage = this.buildPageable(0, (int) count, null, null);

            return paymentRepository.findAll(spec, fullPage)
                    .map(paymentMapper::toDto);
        }
    }

    public Page<PaymentDto> getAllPayments(PaymentSearchCriteria criteria) {
        return getAllPayments(criteria, null);
    }

    public Page<PaymentDto> getAllPayments() {
        return getAllPayments(
                PaymentSearchCriteria
                        .builder()
                        .build()
        );
    }

    public List<PaymentDto> getPaymentsByOrderNumber(Long orderNumber) {
        List<Payment> payments = paymentRepository.findByOrderNumber(orderNumber);
        return paymentMapper.toDtoList(payments);
    }

    public PaymentDto getPaymentById(Long orderNumber, String checkNumber) {
        PaymentId id = new PaymentId(orderNumber, checkNumber);
        return paymentMapper.toDto(
                paymentRepository.findById(id)
                        .orElseThrow(() -> new EntityNotFoundException(
                                "Payment not found with orderNumber: " + orderNumber + " and checkNumber: " + checkNumber))
        );
    }

    public PaymentDto createPayment(Long orderNumber, String checkNumber, PaymentDtoCreateUpdate paymentDto) {
        Payment payment = paymentMapper.toEntity(paymentDto, orderNumber, checkNumber);
        Payment savedPayment = paymentRepository.save(payment);
        return paymentMapper.toDto(savedPayment);
    }

    public PaymentDto updatePayment(Long orderNumber, String checkNumber, PaymentDtoCreateUpdate paymentDto) {
        PaymentId id = new PaymentId(orderNumber, checkNumber);
        Payment originalPayment = paymentRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException(
                        "Payment not found with orderNumber: " + orderNumber + " and checkNumber: " + checkNumber));

        Payment paymentUpdate = paymentMapper.mergeUpdate(originalPayment, paymentDto);

        return paymentMapper.toDto(
                paymentRepository.save(paymentUpdate)
        );
    }

    public void deletePayment(Long orderNumber, String checkNumber) {
        PaymentId id = new PaymentId(orderNumber, checkNumber);
        if (!paymentRepository.existsById(id))
            throw new EntityNotFoundException(
                    "Payment not found with orderNumber: " + orderNumber + " and checkNumber: " + checkNumber);

        paymentRepository.deleteById(id);
    }

    @Transactional
    public void deletePaymentsByOrderNumber(Long orderNumber) {
        paymentRepository.deleteByOrderNumber(orderNumber);
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

    public List<PaymentDto> getRecentPayments(Long customersId, Integer size) {

        System.out.println(size);

        if (size == null) size = 5;

        Pageable pageable = buildPageable(0, size, "paymentDate", "desc");

        return paymentRepository.findByOrder_CustomerNumber(customersId, pageable)
                .stream()
                .map(paymentMapper::toDto)
                .toList();

    }
}