package org.code.orders_service.models.serializable;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.Objects;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PaymentId implements Serializable {

    private Long orderNumber;
    private String checkNumber;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        PaymentId paymentId = (PaymentId) o;
        return Objects.equals(orderNumber, paymentId.orderNumber) &&
                Objects.equals(checkNumber, paymentId.checkNumber);
    }

    @Override
    public int hashCode() {
        return Objects.hash(orderNumber, checkNumber);
    }
}