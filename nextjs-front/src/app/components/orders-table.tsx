"use client"

import { useRouter } from "next/navigation";
import React, { JSX, useState } from "react"

import { TableTopContent } from "./table-top-content-orders"
import { TableBottomContent } from "./table-bottom-content"
import { VerticalDotsIcon } from "./icons/index"
import { tableClassNames } from "@/app/styles/tableStyles";
import {IPage, IOrderTableHome} from "@/contracts";

export const columns = [
  { name: "N° de orden", uid: "orderNumber", sortable: true },
  { name: "Fecha", uid: "orderDate", sortable: true },
  { name: "Cliente", uid: "customerName", sortable: true },
  { name: "Precio total", uid: "total", sortable: true },
  { name: "Estado", uid: "status", sortable: true },
  { name: "Acciones", uid: "actions" },
]

export const statusOptions: Array<{
  name: string;
  uid: string;
  color: "success" | "primary" | "warning" | "danger" | "default" | "secondary";
}> = [
  { name: "Enviado", uid: "sent", color: "success" },
  { name: "En proceso", uid: "inProgress", color: "primary" },
  { name: "Pendiente", uid: "pending", color: "warning" },
  { name: "Entregado", uid: "delivered", color: "success" },
  { name: "Cancelado", uid: "canceled", color: "danger" },
  { name: "Devuelto", uid: "returned", color: "default" },
  { name: "Reembolsado", uid: "refunded", color: "secondary" }
];

type CellKey = (typeof columns[number])["uid"];

const renderCell = (
  uid: CellKey,
  item: IOrderTableHome,
  handlers: {
    onView: (n: number) => void,
    onEdit: (n: number) => void,
    onDelete: (n: number) => void
  }
): JSX.Element => {
  if (uid === "actions") {
    return (
      <div className="relative flex justify-end items-center gap-2">
        <Dropdown className="bg-background border-1 border-default-200">
          <DropdownTrigger>
            <Button isIconOnly radius="full" size="sm" variant="light">
              <VerticalDotsIcon className="text-default-400" />
            </Button>
          </DropdownTrigger>
          <DropdownMenu onAction={(key) => {
            if (key === "view") handlers.onView(item.orderNumber);
            else if (key === "edit") handlers.onEdit(item.orderNumber);
            else if (key === "delete") handlers.onDelete(item.orderNumber);
          }}>
            <DropdownItem key="view">Ver Detalles</DropdownItem>
            <DropdownItem key="edit">Editar</DropdownItem>
            <DropdownItem key="delete">Eliminar</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    );
  }

  if (uid === "status") {
    const status = statusOptions.find(option => option.name === item.status);
    return (
      <Chip
        className="capitalize border-none gap-1 text-default-600"
        color={status?.color ?? "default"}
        size="sm"
        variant="flat"
      >
        {item.status}
      </Chip>
    );
  }

  return <span className="text-default-700">{item[uid as keyof IOrderTableHome] ?? ""}</span>;
};

export function OrdersTable({ ordersPage }: { ordersPage: IPage<IOrderTableHome> }) {
  const orders = ordersPage.content;
  const router = useRouter();

  const handleViewDetails = (orderNumber: number) => {
    router.push(`/orders/${orderNumber}`);
  };

  const handleEditOrder = (orderNumber: number) => {
    console.log("Editar orden:", orderNumber);
  };

  const handleDeleteOrder = (orderNumber: number) => {
    console.log("Eliminar orden:", orderNumber);
  };

  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "customerName",
    direction: "ascending",
  });

  const sortedItems = React.useMemo(() => {
    return [...orders].sort((a, b) => {
      const first = a[sortDescriptor.column as keyof IOrderTableHome]
      const second = b[sortDescriptor.column as keyof IOrderTableHome]
      const cmp = first < second ? -1 : first > second ? 1 : 0

      return sortDescriptor.direction === "descending" ? -cmp : cmp
    })
  }, [sortDescriptor, orders]);

  return (
    <Table
      isCompact
      removeWrapper
      aria-label="User management table with custom cells, pagination and sorting"
      bottomContent={
        <TableBottomContent
          pages={ordersPage.metadata?.totalPages || 0}
        />
      }
      bottomContentPlacement="outside"
      checkboxesProps={{
        classNames: {
          wrapper: "after:bg-foreground after:text-background text-background",
        },
      }}
      classNames={tableClassNames}
      selectionMode="none"
      sortDescriptor={sortDescriptor}
      topContent={
        <TableTopContent
          ordersLength={orders.length}
          statusOptions={statusOptions}
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
          <TableRow key={item.orderNumber}>{(columnKey) =>
            <TableCell>{renderCell(columnKey as string, item, {
              onView: handleViewDetails,
              onEdit: handleEditOrder,
              onDelete: handleDeleteOrder
            })}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}
