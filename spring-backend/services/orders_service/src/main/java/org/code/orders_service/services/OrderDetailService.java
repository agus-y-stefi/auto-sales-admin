package org.code.orders_service.services;

import lombok.RequiredArgsConstructor;
import org.code.orders_service.dtos.OrderDetailDto;
import org.code.orders_service.dtos.OrderDetailDtoCreateUpdate;
import org.code.orders_service.mappers.OrderDetailMapper;
import org.code.orders_service.models.OrderDetail;
import org.code.orders_service.models.serializable.OrderDetailId;
import org.code.orders_service.repositories.OrderDetailRepository;
import org.code.orders_service.specifications.OrderDetailSpecifications;
import org.code.orders_service.specifications.criteria.OrderDetailSearchCriteria;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrderDetailService {

    private final OrderDetailRepository orderDetailRepository;
    private final OrderDetailMapper orderDetailMapper;

    public Page<OrderDetailDto> getAllOrderDetails(OrderDetailSearchCriteria criteria, Pageable pageable) {
        boolean hasFilters = !OrderDetailSpecifications.hasNoFilters(criteria);
        Specification<OrderDetail> spec = hasFilters
                ? OrderDetailSpecifications.withCriteria(criteria)
                : null;

        if (pageable != null) {
            return orderDetailRepository.findAll(spec, pageable)
                    .map(orderDetailMapper::toDto);
        } else {
            long count = hasFilters
                    ? orderDetailRepository.count(spec)
                    : orderDetailRepository.count();

            Pageable fullPage = this.buildPageable(0, (int) count, null, null);

            return orderDetailRepository.findAll(spec, fullPage)
                    .map(orderDetailMapper::toDto);
        }
    }

    public Page<OrderDetailDto> getAllOrderDetails(OrderDetailSearchCriteria criteria) {
        return getAllOrderDetails(criteria, null);
    }

    public Page<OrderDetailDto> getAllOrderDetails() {
        return getAllOrderDetails(
                OrderDetailSearchCriteria
                        .builder()
                        .build()
        );
    }

    public List<OrderDetailDto> getOrderDetailsByOrderNumber(Long orderNumber) {
        List<OrderDetail> orderDetails = orderDetailRepository.findByOrderNumber(orderNumber);
        return orderDetailMapper.toDtoList(orderDetails);
    }

    public OrderDetailDto getOrderDetailById(Long orderNumber, String productCode) {
        OrderDetailId id = new OrderDetailId(orderNumber, productCode);
        return orderDetailMapper.toDto(
                orderDetailRepository.findById(id)
                        .orElseThrow(() -> new EntityNotFoundException(
                                "OrderDetail not found with orderNumber: " + orderNumber + " and productCode: " + productCode))
        );
    }

    public OrderDetailDto createOrderDetail(OrderDetailDtoCreateUpdate orderDetailDto) {
        OrderDetail orderDetail = orderDetailMapper.toEntity(orderDetailDto);
        OrderDetail savedOrderDetail = orderDetailRepository.save(orderDetail);
        return orderDetailMapper.toDto(savedOrderDetail);
    }

    public List<OrderDetailDto> createOrderDetails(List<OrderDetailDtoCreateUpdate> orderDetails) {
        return orderDetailRepository.saveAll(
                        orderDetails.stream().map(orderDetailMapper::toEntity).toList()
                ).stream()
                .map(orderDetailMapper::toDto)
                .collect(Collectors.toList());
    }

    public OrderDetailDto updateOrderDetail(Long orderNumber, String productCode, OrderDetailDtoCreateUpdate orderDetailDto) {
        OrderDetailId id = new OrderDetailId(orderNumber, productCode);
        OrderDetail originalOrderDetail = orderDetailRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException(
                        "OrderDetail not found with orderNumber: " + orderNumber + " and productCode: " + productCode));

        OrderDetail orderDetailUpdate = orderDetailMapper.mergeUpdate(originalOrderDetail, orderDetailDto);

        return orderDetailMapper.toDto(
                orderDetailRepository.save(orderDetailUpdate)
        );
    }

    public void deleteOrderDetail(Long orderNumber, String productCode) {
        OrderDetailId id = new OrderDetailId(orderNumber, productCode);
        if (!orderDetailRepository.existsById(id))
            throw new EntityNotFoundException(
                    "OrderDetail not found with orderNumber: " + orderNumber + " and productCode: " + productCode);

        orderDetailRepository.deleteById(id);
    }

    @Transactional
    public void deleteOrderDetailsByOrderNumber(Long orderNumber) {
        orderDetailRepository.deleteByOrderNumber(orderNumber);
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