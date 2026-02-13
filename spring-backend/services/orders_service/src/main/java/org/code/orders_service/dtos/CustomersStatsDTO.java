package org.code.orders_service.dtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CustomersStatsDTO {
    private Long cantidadOrdenes;
    private Long ordenesCompletadas;
    private BigDecimal precioPromedio;
    private BigDecimal totalOrden;
    private BigDecimal totalPagado;
    private LocalDate ultimaOrdenFecha;
}
