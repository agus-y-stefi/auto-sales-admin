import {ICreateCustomer} from "@/contracts";

export const customerCreateFormDataTransform = (formData: FormData): ICreateCustomer => ({
    customerName: formData.get("customerName") as string,
    contactLastName: formData.get("contactLastName") as string,
    contactFirstName: formData.get("contactFirstName") as string,
    phone: formData.get("phone") as string,
    city: formData.get("city") as string,
    country: formData.get("country") as string,
    creditLimit: Number(formData.get("creditLimit")),
})
