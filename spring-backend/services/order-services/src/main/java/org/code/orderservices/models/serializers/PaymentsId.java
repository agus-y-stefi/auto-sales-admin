package org.code.orderservices.models.serializers;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.util.Objects;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Embeddable
public class PaymentsId implements Serializable {

    @Column(name = "customer_number")
    private Integer customerNumber;

    @Column(name = "check_number")
    private String checkNumber;

    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null || getClass() != obj.getClass()) return false;
        PaymentsId that = (PaymentsId) obj;
        return customerNumber.equals(that.getCustomerNumber()) && checkNumber.equals(that.getCheckNumber());
    }

    @Override
    public int hashCode() {
        return Objects.hash(customerNumber, checkNumber);
    }
}
