"use client"

import React from "react"
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Button,
    DropdownTrigger,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Chip,
    User,
} from "@heroui/react"
import {columns, statusOptions} from "@/app/data/table-config"
import type {SortDescriptor} from "@heroui/react"
import type {Order} from "@/app/data/orders"
import {TableTopContent} from "./table-top-content"
import {TableBottomContent} from "./table-bottom-content"
import {VerticalDotsIcon} from "./icons/index"

const statusColorMap = {
    active: "success",
    paused: "danger",
    vacation: "warning",
}


export function OrdersTable({orders}: { orders: Order[] }) {
    const [filterValue, setFilterValue] = React.useState("")
    const [statusFilter, setStatusFilter] = React.useState("all")
    const [rowsPerPage, setRowsPerPage] = React.useState(5)
    const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
        column: "age",
        direction: "ascending",
    })

    const [page, setPage] = React.useState(1)

    const pages = Math.ceil(orders.length / rowsPerPage)

    const hasSearchFilter = Boolean(filterValue)

    const filteredItems = React.useMemo(() => {
        let filteredOrders = [...orders]

        if (hasSearchFilter) {
            filteredOrders = filteredOrders.filter((order) => order.orderNumber.toString().includes(filterValue.toLowerCase()))
        }
        if (statusFilter !== "all" && Array.from(statusFilter).length !== statusOptions.length) {
            filteredOrders = filteredOrders.filter((order) => Array.from(statusFilter).includes(order.status))
        }

        return filteredOrders
    }, [orders, filterValue, statusFilter])


    const items = React.useMemo(() => {
        const start = (page - 1) * rowsPerPage
        const end = start + rowsPerPage

        return filteredItems.slice(start, end)
    }, [page, filteredItems, rowsPerPage])


    const sortedItems = React.useMemo(() => {
        return [...items].sort((a, b) => {
            const first = a[sortDescriptor.column as keyof Order]
            const second = b[sortDescriptor.column as keyof Order]
            const cmp = first < second ? -1 : first > second ? 1 : 0

            return sortDescriptor.direction === "descending" ? -cmp : cmp
        })
    }, [sortDescriptor, items])


    const renderCell = React.useCallback((order: Order, columnKey: string) => {

        const cellValue = order[columnKey as keyof Order]

        switch (columnKey) {
            case "status":
                return (
                    <Chip
                        className="capitalize border-none gap-1 text-default-600"
                        color={(statusColorMap[order.status as keyof typeof statusColorMap] ?? "default") as "success" | "danger" | "warning" | "default" | "primary" | "secondary"}
                        size="sm"
                        variant="dot"
                    >
                        {cellValue}
                    </Chip>
                )
            case "actions":
                return (
                    <div className="relative flex justify-end items-center gap-2">
                        <Dropdown className="bg-background border-1 border-default-200">
                            <DropdownTrigger>
                                <Button isIconOnly radius="full" size="sm" variant="light">
                                    <VerticalDotsIcon className="text-default-400"/>
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu>
                                <DropdownItem key="view">Ver</DropdownItem>
                                <DropdownItem key="edit">Editar</DropdownItem>
                                <DropdownItem key="delete">Eliminar</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                )
            default:
                return cellValue
        }
    }, [])

    const onRowsPerPageChange = React.useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
        setRowsPerPage(Number(e.target.value))
        setPage(1)
    }, [])

    const onSearchChange = React.useCallback((value: string) => {
        if (value) {
            setFilterValue(value)
            setPage(1)
        } else {
            setFilterValue("")
        }
    }, [])

    const classNames = React.useMemo(
        () => ({
            wrapper: ["max-h-[382px]", "max-w-3xl"],
            th: ["bg-transparent", "text-default-500", "border-b", "border-divider"],
            td: [
                "group-data-[first=true]/tr:first:before:rounded-none",
                "group-data-[first=true]/tr:last:before:rounded-none",
                "group-data-[middle=true]/tr:before:rounded-none",
                "group-data-[last=true]/tr:first:before:rounded-none",
                "group-data-[last=true]/tr:last:before:rounded-none",
            ],
        }),
        [],
    )

  return (
    <Table
      isCompact
      removeWrapper
      aria-label="User management table with custom cells, pagination and sorting"
      bottomContent={
        <TableBottomContent
          items={items}
          page={page}
          pages={pages}
          hasSearchFilter={hasSearchFilter}
          setPage={setPage}
          selectedKeys={new Set()} // Replace with the actual selected keys if available
        />
      }
      bottomContentPlacement="outside"
      checkboxesProps={{
        classNames: {
          wrapper: "after:bg-foreground after:text-background text-background",
        },
      }}
      classNames={classNames}
      selectionMode="none"
      sortDescriptor={sortDescriptor}
      topContent={
        <TableTopContent
          filterValue={filterValue}
          statusFilter={statusFilter}
          onSearchChange={onSearchChange}
          setFilterValue={setFilterValue}
          setStatusFilter={setStatusFilter}
          onRowsPerPageChange={onRowsPerPageChange}
          ordersLength={orders.length}
        />
      }
      topContentPlacement="outside"
      onSortChange={setSortDescriptor}
    >
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
            allowsSorting={column.sortable}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody emptyContent={"No clients found"} items={sortedItems}>
        {(item) => (
          <TableRow key={item.orderNumber}>{(columnKey) => <TableCell>{renderCell(item, columnKey as string)}</TableCell>}</TableRow>
        )}
      </TableBody>
    </Table>
  )
}
