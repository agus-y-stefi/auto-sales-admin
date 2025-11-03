"use client"

import React, {useEffect, useState} from "react"

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import {FirstStep} from "@/components/orders-home/new/steps/first-step";
import {SecondStep} from "@/components/orders-home/new/steps/second-step";
import {useOrderStore} from "@/stores";
import {ThirdStep} from "@/components/orders-home/new/steps/third-step";


export function NewOrderModal({open, onOpenChange}: { open: boolean; onOpenChange: (open: boolean) => void }) {

    const step = useOrderStore(state => state.step);
    const clear = useOrderStore(s => s.clear);

    useEffect(() => {
        if (open) {
            clear();
        }
    }, [open]);

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="min-w-5xl">
                <DialogHeader>
                    <DialogTitle>
                        <div className={"flex flex-col gap-2"}>
                            <p>New Order - Paso 1 de 3</p>
                            <p className={"text-sm font-light"}>Informacion basica de la orden</p>
                        </div>
                    </DialogTitle>
                </DialogHeader>
                <div className={"max-h-[700px] overflow-y-auto flex flex-col justify-between gap-6 px-5"}>
                    {
                        step === 1 && <FirstStep onOpenChange={onOpenChange}/>
                    }
                    {
                        step === 2 && <SecondStep/>
                    }
                    {
                        step === 3 && <ThirdStep onOpenChange={onOpenChange}/>
                    }
                </div>
            </DialogContent>
        </Dialog>
    )
}
