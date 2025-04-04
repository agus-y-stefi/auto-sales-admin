"use client"

import type React from "react"
import { Input, Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@heroui/react"
import { SearchIcon, ChevronDownIcon, PlusIcon } from "./icons"
import { columns, statusOptions } from "@/app/data/table-config"
import { capitalize } from "./utils/helpers"

interface TableTopContentProps {
  filterValue: string
  statusFilter: string
  visibleColumns: Set<string>
  onSearchChange: (value: string) => void
  setFilterValue: (value: string) => void
  setStatusFilter: (value: any) => void
  setVisibleColumns: (value: any) => void
  onRowsPerPageChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
  usersLength: number
}

export function TableTopContent({
  filterValue,
  statusFilter,
  visibleColumns,
  onSearchChange,
  setFilterValue,
  setStatusFilter,
  onRowsPerPageChange,
  usersLength,
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
          placeholder="Search by name..."
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
                Status
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
          <Dropdown>
            <DropdownTrigger className="hidden sm:flex">
              <Button endContent={<ChevronDownIcon className="text-small" />} size="sm" variant="flat">
                Columns
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              disallowEmptySelection
              aria-label="Table Columns"
              closeOnSelect={false}
              selectedKeys={visibleColumns}
              selectionMode="multiple"
            >
              {columns.map((column) => (
                <DropdownItem key={column.uid} className="capitalize">
                  {capitalize(column.name)}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
          <Button className="bg-foreground text-background" endContent={<PlusIcon width={16} height={16} />} size="sm">
            Add New
          </Button>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-default-400 text-small">Total {usersLength} users</span>
        <label className="flex items-center text-default-400 text-small">
          Rows per page:
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

