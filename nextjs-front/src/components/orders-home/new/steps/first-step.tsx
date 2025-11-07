"use client";
import React, {useEffect, useState} from "react";
import {CustomCombobox, PairValueComboBox} from "@/components/orders-home/new/components/custom-combobox";
import {Calendar28} from "@/components/ui/calendar-picker";
import {Textarea} from "@/components/ui/textarea";
import {Button} from "@/components/ui/button";
import {ChevronRight} from "lucide-react";
import {useOrderStore} from "@/stores";
import {getCustomersMinimalData, getEmployeesMinimalData, ICustomer, ICustomerMinimalData, IEmployeeMinimalData, IPage} from "@/contracts";

export const FirstStep = ({onOpenChange}: {onOpenChange: (open: boolean) => void}) => {

    const setStep = useOrderStore(state => state.setStep);

    return <React.Fragment>
        <div className={"flex flex-col gap-6"}>
            <div className={"flex flex-col gap-4 py-3"}>
                <div className={"flex flex-col gap-1"}>
                    <SelectCustomer/>
                </div>
                <div className={"flex flex-col gap-1"}>
                    <SelectSalesRep/>
                </div>
                <div className={"flex flex-col gap-1"}>
                    <SelectRequiredDate/>
                </div>
                <div className={"flex flex-col gap-1"}>
                    <CommentsInput />
                </div>
            </div>
            <div className="flex justify-end gap-2 pt-4">
                <Button type="button" variant="outline" onClick={() =>  onOpenChange(false) }>
                    Cancelar
                </Button>
                <Button
                    type="button"
                    onClick={() => {
                        setStep(2)
                    }}
                    //disabled={!formData.customerNumber || !formData.salesRepEmployeeNumber || !formData.requiredDate}
                >
                    Siguiente <ChevronRight className="ml-2 h-4 w-4"/>
                </Button>
            </div>
        </div>
    </React.Fragment>
}

const SelectCustomer = () => {

    const [customerData, setCustomerData] = useState<PairValueComboBox[] | undefined>(undefined);

    const customerSelectedData = useOrderStore(s => s.customerId);
    const setCustomerSelectedData = useOrderStore(s => s.setCustomer);

    useEffect(() => {
        getCustomersMinimalData().then(data => {
            const customersFormatted = data.map((customer: ICustomerMinimalData) => ({ID: customer.customerNumber.toString(), value: customer.customerName}));
            setCustomerData(customersFormatted);
        })
    }, []);

    if (!customerData) {
        return <div>Cargando clientes...</div>
    }

    return <React.Fragment>
        <label className={"font-bold"}>Cliente *</label>
        <CustomCombobox data={customerData} title={"Customers"} selectedData={customerSelectedData} setSelectedData={setCustomerSelectedData}/>
    </React.Fragment>
}

const SelectSalesRep = () => {

    const [salesRep, setSalesRep] = useState<PairValueComboBox[] | undefined>(undefined);

    const salesRepSelectedData = useOrderStore(s => s.salesRepId);
    const setSalesRepSelectedData = useOrderStore(s => s.setSalesRep);

    useEffect(() => {
        getEmployeesMinimalData()
            .then((fetchSalesRep) => {
                setSalesRep(
                    fetchSalesRep.map((e: IEmployeeMinimalData) =>
                        ({ID: e.employeeNumber.toString(), value: `${e.firstName} ${e.lastName}`})
                    )
                );
            });
    }, []);

    if (!salesRep) {
        return <div>Cargando representantes de ventas...</div>
    }

    return <React.Fragment>
        <label className={"font-bold"}>Representante de Ventas *</label>
        <CustomCombobox data={salesRep} title={"Representantes de Ventas"} selectedData={salesRepSelectedData} setSelectedData={setSalesRepSelectedData}/>
    </React.Fragment>

}

const SelectRequiredDate = () => {
    const requiredDate = useOrderStore(s => s.requiredDate);
    const setRequiredDate = useOrderStore(s => s.setDate);

    useEffect(() => {
        console.log(requiredDate);
    }, [requiredDate]);

    return <React.Fragment>
        <label className={"font-bold"}>Fecha Requerida *</label>
        <Calendar28
            date={requiredDate}
            onDateChange={setRequiredDate}

        />
    </React.Fragment>
}

const CommentsInput = () => {
    const comments = useOrderStore(s => s.comments);
    const setComments = useOrderStore(s => s.setComments);
    return <React.Fragment>
        <label className={"font-bold"}>Comentarios</label>
        <Textarea value={comments} placeholder={"Agrega comentarios adicionales sobre la orden..."} onChange={(e)=>{
            setComments(e.target.value);
        }}/>
    </React.Fragment>
}