"use client"

import React, {useMemo} from "react"
import {Input, Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, useDisclosure} from "@heroui/react"
import {SearchIcon, ChevronDownIcon, PlusIcon} from "./icons"
import {capitalize} from "./utils/helpers"
import type {Selection} from "@heroui/react";
import {ModalNewCustomer} from "./modal-new-customer";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {useDebouncedCallback} from "use-debounce";

interface TableTopContentProps {
    customersLength: number,
    statusOptions: { uid: string; name: string }[]
}

export function TableTopContent({
                                    customersLength,
                                    statusOptions,
                                }: TableTopContentProps) {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    const searchParams = useSearchParams();
    const pathname = usePathname();
    const {replace} = useRouter()

    const statusParam = searchParams.get('status');
    const statusFilter = useMemo(() => new Set(statusParam?.split(',') ?? []), [statusParam]);


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

    const handleStatusFilter = (keys: Selection) => {
        const newStatusFilter = new Set(keys as Set<string>);

        const param = new URLSearchParams(searchParams);
        param.set('page', '1');

        if (newStatusFilter.size > 0) {
            param.set('status', Array.from(newStatusFilter).join(','));
        } else {
            param.delete('status');
        }

        replace(`${pathname}?${param.toString()}`);
    };


    return (
        <><ModalNewCustomer isOpen={isOpen} onOpenChange={onOpenChange}/>
            <div className={"flex flex-col gap-4"}>
                <div className={"flex justify-between gap-3 items-end"}>
                    {/* barra de busqueda */}
                    <Input
                        isClearable
                        classNames={{
                            base: "w-full sm:max-w-[44%]",
                            inputWrapper: "border-1",
                        }}
                        placeholder="Buscar por nombre de cliente..."
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
                                aria-label="Table Columns"
                                closeOnSelect={false}
                                selectionMode="multiple"
                                defaultSelectedKeys={statusFilter}
                                onSelectionChange={handleStatusFilter}
                            >
                                {statusOptions.map((status) => (
                                    <DropdownItem key={status.uid} className="capitalize">
                                        {capitalize(status.name)}
                                    </DropdownItem>
                                ))}
                            </DropdownMenu>
                        </Dropdown>
                        {/* boton de nuevo cliente */}
                        <Button className="bg-foreground text-background" onPress={onOpen}
                                endContent={<PlusIcon width={16} height={16}/>} size="md">
                            Nuevo Cliente
                        </Button>
                    </div>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-default-400 text-small">Total {customersLength} clientes</span>
                    <label className="flex items-center text-default-400 text-small">
                        Filas por página:
                        <select className="bg-transparent outline-none text-default-400 text-small"
                                defaultValue={searchParams.get('limit')?.toString() || "5"}
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