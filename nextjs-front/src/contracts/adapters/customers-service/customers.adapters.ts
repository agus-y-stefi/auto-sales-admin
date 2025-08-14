import { getAllCustomers } from "@/contracts"

export const getCustomersHomeTable = async ()=>{
    const response = await getAllCustomers()
    return response
}
