package org.code.orders_service.services;

import lombok.RequiredArgsConstructor;
import org.code.orders_service.clients.CustomerClient;
import org.code.orders_service.dtos.OrderDto;
import org.code.orders_service.dtos.OrderDtoCreateUpdate;
import org.code.orders_service.dtos.OrderDtoResume;
import org.code.orders_service.dtos.OrderDtoWithPaymentResume;
import org.code.orders_service.mappers.OrderMapper;
import org.code.orders_service.models.Order;
import org.code.orders_service.repositories.OrderDetailRepository;
import org.code.orders_service.repositories.OrderRepository;
import org.code.orders_service.specifications.OrderSpecifications;
import org.code.orders_service.specifications.criteria.OrderSearchCriteria;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import jakarta.persistence.EntityNotFoundException;

import java.math.BigDecimal;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;
    private final OrderDetailRepository orderDetailRepository;

    private final OrderMapper orderMapper;

    private final CustomerClient customerClient;

    public Page<OrderDto> getAllOrders(OrderSearchCriteria criteria, Pageable pageable) {
        boolean hasFilters = OrderSpecifications.hasFilters(criteria);
        Specification<Order> spec = hasFilters
                ? OrderSpecifications.withCriteria(criteria)
                : null;

        if (pageable != null) {
            return orderRepository.findAll(spec, pageable)
                    .map(orderMapper::toDto);
        } else {
            long count = hasFilters
                    ? orderRepository.count(spec)
                    : orderRepository.count();

            Pageable fullPage = this.buildPageable(0, (int) count, null, null);

            return orderRepository.findAll(spec, fullPage)
                    .map(orderMapper::toDto);
        }
    }

    public Page<OrderDtoResume> getAllOrdersResume(OrderSearchCriteria criteria, Pageable pageable) {

        Map<Long, BigDecimal> totalsMap = orderDetailRepository.findAllOrderTotals().stream()
                .collect(Collectors.toMap(
                        row -> (Long) row[0],
                        row -> (BigDecimal) row[1]
                ));

        Map<Integer, String> allCustomersName = customerClient.getAllCustomersName();

        return this.getAllOrders(criteria, pageable)
                .map(orderDto -> orderMapper.toDtoResume(orderDto, allCustomersName, totalsMap));

    }

    public OrderDto getOrderById(Long id) {
        return orderMapper.toDto(
                orderRepository.findById(id)
                        .orElseThrow(() -> new EntityNotFoundException("Order not found with id: " + id))
        );
    }

    public OrderDto createOrder(OrderDtoCreateUpdate orderDto) {
        Order order = orderMapper.toEntity(orderDto);
        Order savedOrder = orderRepository.save(order);
        return orderMapper.toDto(savedOrder);
    }

    public OrderDto updateOrder(Long id, OrderDtoCreateUpdate orderDto) {
        // Verificar que la orden existe
        Order originalOrder = orderRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Order not found with id: " + id));

        // Actualizar los campos (preservando el ID original)
        Order orderUpdate = orderMapper.mergeUpdate(originalOrder, orderDto);

        // Guardar cambios
        return orderMapper.toDto(
                orderRepository.save(orderUpdate)
        );
    }

    public void deleteOrder(Long id) {
        if (!orderRepository.existsById(id))
            throw new EntityNotFoundException("Order not found with id: " + id);

        orderRepository.deleteById(id);
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

    public OrderDtoWithPaymentResume getOrderByIdWithPaymentInfo(Long id) {

        var p = orderRepository.findOrderResume(id);
        if (p == null) return null;

        return OrderDtoWithPaymentResume.builder()
                .orderNumber(p.getOrderNumber())
                .orderDate(p.getOrderDate())
                .requiredDate(p.getRequiredDate())
                .shippedDate(p.getShippedDate())
                .status(p.getStatus())
                .comments(p.getComments())
                .customerNumber(p.getCustomerNumber())
                .salesRepEmployeeNumber(p.getSalesRepEmployeeNumber())
                .totalPaidAmount(p.getTotalPaidAmount())
                .remainingAmount(p.getRemainingAmount())
                .isFullyPaid(p.getIsFullyPaid())
                .build();


    }
}