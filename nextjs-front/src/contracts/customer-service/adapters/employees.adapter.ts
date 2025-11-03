import {IEmployee, IEmployeeMinimalData} from "@/contracts";
import {getAllEmployees, getEmployeeById as getEmployeeByIdClient} from "@/clients";
import {toEmployee, toEmployeeMinimalData} from "@/contracts/customer-service/mappers/employees.mappers";

export const getEmployeesMinimalData = async (): Promise<IEmployeeMinimalData[]> => {
    const employees = await getAllEmployees();

    const data = employees.data.content || [];

    return data.map((employee) => toEmployeeMinimalData(employee));

}

export const getEmployeeById = async (employeeNumber: number): Promise<IEmployee> => {
    const employee = await getEmployeeByIdClient(employeeNumber);

    if (!employee || !employee.data) {
        throw new Error("Failed to fetch employee data");
    }

    return toEmployee(employee.data);
}