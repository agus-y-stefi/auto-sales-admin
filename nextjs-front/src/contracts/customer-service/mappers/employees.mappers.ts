import {IEmployee, IEmployeeMinimalData} from "@/contracts";
import {EmployeeDto} from "@/clients"

export const toEmployeeMinimalData = (employee: EmployeeDto ): IEmployeeMinimalData => {
    return {
        employeeNumber: employee.employeeNumber,
        firstName: employee.firstName || "unknown",
        lastName: employee.lastName,
    }
}

export const toEmployee = (employee: EmployeeDto ): IEmployee => {
    return {
        employeeNumber: employee.employeeNumber,
        firstName: employee.firstName || "unknown",
        lastName: employee.lastName,
        extension: employee.extension || "unknown",
        officeCode: employee.officeCode || "unknown",
    }
}