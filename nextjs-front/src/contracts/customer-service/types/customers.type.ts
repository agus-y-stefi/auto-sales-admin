
export interface ICustomer {
    customerNumber: number;
    customerName: string;
    contactFirstName: string;
    contactLastName: string;
    phone: string;
    city: string;
    country: string;
    creditLimit: number;
    status: string;
}

export interface ICustomerUpdate extends Omit<ICustomer,
    "customerNumber"
>{
}

export interface ICustomerMinimalData {
    customerNumber: number;
    customerName: string;
}

export interface ICustomersTableHome extends Omit<ICustomer,
    "contactLastName" | "contactFirstName"
>{
    contactName: string;
}

export interface ICreateCustomer extends Omit<ICustomer,
    "customerNumber"
>{
}

export interface ICustomerComboBox extends Omit<ICustomer,
    'contactFirstName' | 'contactLastName' | 'creditLimit'
>
{

}