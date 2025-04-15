"use client"

import type React from "react"
import { Input, Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, useDisclosure } from "@heroui/react"
import { SearchIcon, ChevronDownIcon, PlusIcon } from "./icons"
import { capitalize } from "./utils/helpers"
import type { Selection } from "@heroui/react";
import { ModalNewOrder } from "./modal-new-order";

interface TableTopContentProps {
  filterValue: string
  statusFilter: Set<string> // CAMBIADO: era string
  onSearchChange: (value: string) => void
  setFilterValue: (value: string) => void
  setStatusFilter: (value: Set<string>) => void // CAMBIADO: era any
  onRowsPerPageChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
  ordersLength: number,
    statusOptions: { uid: string; name: string }[]
}

export function TableTopContent({
  filterValue,
  statusFilter,
  onSearchChange,
  setFilterValue,
  setStatusFilter,
  onRowsPerPageChange,
  ordersLength,
  statusOptions,
}: TableTopContentProps) {
   const {isOpen, onOpen, onOpenChange} = useDisclosure();
  return (
    <><ModalNewOrder isOpen={isOpen} onOpenChange={onOpenChange} /><div className={"flex flex-col gap-4"}>
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
          startContent={<SearchIcon className="text-default-300" />}
          value={filterValue}
          variant="bordered"
          onClear={() => setFilterValue("")}
          onValueChange={onSearchChange} />
        <div className="flex gap-3">
          {/* boton de estado */}
          <Dropdown>
            <DropdownTrigger className="hidden sm:flex">
              <Button endContent={<ChevronDownIcon className="text-small" />} size="md" variant="flat">
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
          <Button className="bg-foreground text-background" onPress={onOpen} endContent={<PlusIcon width={16} height={16} />} size="md">
            Nueva Orden
          </Button>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-default-400 text-small">Total {ordersLength} de ordenes</span>
        <label className="flex items-center text-default-400 text-small">
          Filas por página:
          <select className="bg-transparent outline-none text-default-400 text-small" onChange={onRowsPerPageChange}>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
          </select>
        </label>
      </div>
    </div></>
  )
}

