"use client"

import type React from "react"
import { Input, Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@heroui/react"
import { SearchIcon, ChevronDownIcon, PlusIcon } from "./icons"
import { capitalize } from "./utils/helpers"

interface TableTopContentProps {
  filterValue: string
  statusFilter: string
  onSearchChange: (value: string) => void
  setFilterValue: (value: string) => void
  setStatusFilter: (value: any) => void
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
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between gap-3 items-end">
        <Input
          isClearable
          classNames={{
            base: "w-full sm:max-w-[44%]",
            inputWrapper: "border-1",
          }}
          placeholder="Buscar por cliente..."
          size="sm"
          startContent={<SearchIcon className="text-default-300" />}
          value={filterValue}
          variant="bordered"
          onClear={() => setFilterValue("")}
          onValueChange={onSearchChange}
        />
        <div className="flex gap-3">
          <Dropdown>
            <DropdownTrigger className="hidden sm:flex">
              <Button endContent={<ChevronDownIcon className="text-small" />} size="sm" variant="flat">
                Estado
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              disallowEmptySelection
              aria-label="Table Columns"
              closeOnSelect={false}
              selectedKeys={statusFilter}
              selectionMode="multiple"
              onSelectionChange={setStatusFilter}
            >
              {statusOptions.map((status) => (
                <DropdownItem key={status.uid} className="capitalize">
                  {capitalize(status.name)}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
          <Button className="bg-foreground text-background" endContent={<PlusIcon width={16} height={16} />} size="sm">
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
    </div>
  )
}

