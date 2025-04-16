"use client"

import type React from "react"
import {Input, Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, useDisclosure} from "@heroui/react"
import {SearchIcon, ChevronDownIcon, PlusIcon} from "./icons"
import {capitalize} from "./utils/helpers"
import type {Selection} from "@heroui/react";
import {ModalNewOrder} from "./modal-new-order";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {useDebouncedCallback} from "use-debounce";

interface TableTopContentProps {
    statusFilter: Set<string> // CAMBIADO: era string
    setStatusFilter: (value: Set<string>) => void // CAMBIADO: era any
    ordersLength: number,
    statusOptions: { uid: string; name: string }[]
}

export function TableTopContent({
                                    statusFilter,
                                    setStatusFilter,
                                    ordersLength,
                                    statusOptions,
                                }: TableTopContentProps) {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    const searchParams = useSearchParams();
    const pathname = usePathname();
    const {replace} = useRouter()


    const handleSearch = useDebouncedCallback((term: string) => {
        const param = new URLSearchParams(searchParams);

        param.set('page', '1');

        if (term) {
            param.set('query', term);
        } else {
            param.delete('query');
        }

        replace(`${pathname}?${param.toString()}`);

    }, 300)

    const handleLimitPage = (limit : number) =>{
        const param = new URLSearchParams(searchParams);

        param.set('page', '1');
        param.set('limit', limit.toString());

        replace(`${pathname}?${param.toString()}`);
    }


    return (
        <><ModalNewOrder isOpen={isOpen} onOpenChange={onOpenChange}/>
            <div className={"flex flex-col gap-4"}>
                <div className={"flex justify-between gap-3 items-end"}>
                    {/* barra de busqueda */}
                    <Input
                        isClearable
                        classNames={{
                            base: "w-full sm:max-w-[44%]",
                            inputWrapper: "border-1",
                        }}
                        placeholder="Buscar por cliente..."
                        size="md"
                        startContent={<SearchIcon className="text-default-300"/>}
                        variant="bordered"
                        onClear={() => handleSearch("")}
                        onValueChange={(e) =>{handleSearch(e)}}
                        defaultValue={searchParams.get('query')?.toString()}
                    />
                    <div className="flex gap-3">
                        {/* boton de estado */}
                        <Dropdown>
                            <DropdownTrigger className="hidden sm:flex">
                                <Button endContent={<ChevronDownIcon className="text-small"/>} size="md" variant="flat">
                                    Estado
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu
                                disallowEmptySelection
                                aria-label="Table Columns"
                                closeOnSelect={false}
                                selectedKeys={statusFilter as Selection}
                                selectionMode="multiple"
                                onSelectionChange={(keys: Selection) => setStatusFilter(new Set(keys as Set<string>))}
                            >
                                {statusOptions.map((status) => (
                                    <DropdownItem key={status.uid} className="capitalize">
                                        {capitalize(status.name)}
                                    </DropdownItem>
                                ))}
                            </DropdownMenu>
                        </Dropdown>
                        {/* boton de nueva orden */}
                        <Button className="bg-foreground text-background" onPress={onOpen}
                                endContent={<PlusIcon width={16} height={16}/>} size="md">
                            Nueva Orden
                        </Button>
                    </div>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-default-400 text-small">Total {ordersLength} de ordenes</span>
                    <label className="flex items-center text-default-400 text-small">
                        Filas por página:
                        <select className="bg-transparent outline-none text-default-400 text-small"
                                onChange={(e) => handleLimitPage(parseInt(e.target.value))}>
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                        </select>
                    </label>
                </div>
            </div>
        </>
    )
}

