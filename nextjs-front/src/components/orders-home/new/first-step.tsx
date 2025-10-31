"use client";
import React, {useEffect, useState} from "react";
import {CustomCombobox} from "@/components/orders-home/new/components/custom-combobox";
import {Calendar28} from "@/components/ui/calendar-picker";
import {Textarea} from "@/components/ui/textarea";

export const FirstStep = () => {

    const customerData: { ID: string, value: string }[] = [
        {ID: "102", value: "Regalos SA"},
        {ID: "103", value: "Mini Gifts Distributors Ltd."},
        {ID: "110", value: "Regalos SA"},
        {ID: "101", value: "Detalles y Más"}
    ];

    const salesRepData: { ID: string, value: string }[] = [
        {ID: "201", value: "Juan Perez"},
        {ID: "202", value: "Maria Gomez"},
        {ID: "203", value: "Carlos Sanchez"},
        {ID: "204", value: "Ana Martinez"}
    ];

    return <React.Fragment>
        <div className={"flex flex-col gap-4 py-3"}>
            <div className={"flex flex-col gap-1"}>
                <label className={"font-bold"}>Cliente *</label>
                <CustomCombobox data={customerData} title={"Customers"}/>
            </div>
            <div className={"flex flex-col gap-1"}>
                <label className={"font-bold"}>Representante de Ventas *</label>
                <CustomCombobox data={salesRepData} title={"Representantes de Ventas"}/>
            </div>
            <div className={"flex flex-col gap-1"}>
                <label className={"font-bold"}>Fecha Requerida *</label>
                <Calendar28 />
            </div>
            <div className={"flex flex-col gap-1"}>
                <label className={"font-bold"}>Comentarios</label>
                <Textarea placeholder={"Agrega comentarios adicionales sobre la orden..."} />
            </div>
        </div>
    </React.Fragment>
}