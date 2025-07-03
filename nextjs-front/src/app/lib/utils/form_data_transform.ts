import {ICreateCustomer} from "@/app/lib/definitions/customers/customers";

export const customerCreateFormDataTransform = (formData: FormData): ICreateCustomer => {
    const customer: ICreateCustomer = {
        customerName: formData.get("nombreCliente") as string,
        contactLastName: formData.get("apellidoContacto") as string,
        contactFirstName: formData.get("nombreContacto") as string,
        phone: formData.get("telefono") as string,
        city: formData.get("ciudad") as string,
        country: formData.get("pais") as string,
        creditLimit: Number(formData.get("limiteCredito")) || 0,
    };

    return customer;
}