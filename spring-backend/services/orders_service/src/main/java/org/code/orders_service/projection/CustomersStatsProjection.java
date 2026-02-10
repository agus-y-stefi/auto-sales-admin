package org.code.orders_service.projection;

import java.math.BigDecimal;
import java.time.LocalDate;

public interface CustomersStatsProjection {
    Long getCantidadOrdenes();

    Long getOrdenesCompletadas();

    BigDecimal getPrecioPromedio();

    BigDecimal getTotalOrden();

    BigDecimal getTotalPagado();

    LocalDate getUltimaOrdenFecha();
}
