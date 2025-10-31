
export interface ICustomer {
    customerNumber: number;
    customerName: string;
    contactFirstName: string;
    contactLastName: string;
    phone: string;
    city: string;
    country: string;
    creditLimit: number;
}

export interface ICustomersTableHome extends Omit<ICustomer,
    "contactLastName" | "contactFirstName"
>{
    contactName: string;
    status: string;
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