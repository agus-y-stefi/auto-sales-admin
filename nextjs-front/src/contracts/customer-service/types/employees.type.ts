export interface IEmployee{
    employeeNumber: number;
    lastName: string;
    firstName: string;
    extension: string;
    officeCode: string;
}

export interface IEmployeeMinimalData{
    employeeNumber: number;
    firstName: string;
    lastName: string;
}