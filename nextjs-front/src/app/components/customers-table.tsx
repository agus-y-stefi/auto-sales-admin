"use client"

import React, {JSX, useEffect, useState} from "react"
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
    Chip, addToast,
} from "@heroui/react"
import type {SortDescriptor} from "@heroui/react"

import {TableTopContent} from "./table-top-content-customers"
import {TableBottomContent} from "./table-bottom-content"
import {VerticalDotsIcon} from "./icons/index"
import {formatCurrency} from "@/app/lib/utils/format";
import {IPage, ICustomersTableHome, deleteCustomer} from "@/contracts";
import {CellKey, tableClassNames, statusOptionsTableHome, columnsCustomersTableHome} from "@/app/lib/config/tables/customer-home.config";
import {CloseIcon} from "@heroui/shared-icons";

const useSortedItems = (customers: ICustomersTableHome[]) => {
    const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
        column: "customerName",
        direction: "ascending",
    })

    const sortedItems = React.useMemo(() => {
        return [...customers].sort((a, b) => {
            const first = a[sortDescriptor.column as keyof ICustomersTableHome]
            const second = b[sortDescriptor.column as keyof ICustomersTableHome]
            const cmp = first < second ? -2 : first > second ? 1 : 0

            return sortDescriptor.direction === "descending" ? -cmp : cmp
        })
    }, [sortDescriptor, customers])

    return {sortedItems, setSortDescriptor, sortDescriptor}
}

const useDelete = (setCustomers: React.Dispatch<React.SetStateAction<ICustomersTableHome[]>>) => {
    // Ya no necesitas useDisclosure para el modal

    const handleDelete = (customerNumber: number) => {
        deleteCustomer(customerNumber)
            .then((response) => {
                setCustomers(prevState => prevState.filter(customer => customer.customerNumber !== customerNumber));

                // Mostrar toast de éxito
                addToast({
                    title: "Eliminación Exitosa",
                    description: "El cliente ha sido eliminado correctamente.",
                    color: "success",
                    variant: "flat",
                })
            })
            .catch((error) => {
                console.error('Error al eliminar:', error);

                addToast({
                    title: "Error al Eliminar",
                    description: "Hubo un problema al eliminar el cliente. Por favor, inténtalo de nuevo.",
                    color: "danger",
                    variant: "flat",
                    icon: <CloseIcon />,
                });

                // Mostrar toast de error
            });
    }

    return {handleDelete};
}


export function CustomersTable({customersPage}: { customersPage: IPage<ICustomersTableHome> }) {
    const [customers, setCustomers] = useState(customersPage.content);

    // Considera usar useEffect para sincronizar
    useEffect(() => {
        setCustomers(customersPage.content);
    }, [customersPage.content]);

    const {handleDelete} = useDelete(setCustomers);

    const {sortedItems, setSortDescriptor, sortDescriptor} = useSortedItems(customers);

    const renderCell = (uid: CellKey, item: ICustomersTableHome): JSX.Element => {
        if (uid === "actions") {
            return (
                <div className="relative flex justify-end items-center gap-2">
                    <Dropdown className="bg-background border-1 border-default-200">
                        <DropdownTrigger>
                            <Button isIconOnly radius="full" size="sm" variant="light">
                                <VerticalDotsIcon className="text-default-400"/>
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu>
                            <DropdownItem key="edit">Editar</DropdownItem>
                            <DropdownItem key="delete" onPress={() => handleDelete(item.customerNumber)}>Eliminar</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>
            );
        }

        if (uid === "status") {
            const status = statusOptionsTableHome.find(option => option.uid === item.status);
            return (
                <Chip
                    className="border-none gap-1 text-default-600"
                    color={status?.color ?? "default"}
                    size="sm"
                    variant="flat"
                >
                    {status?.name ?? item.status}
                </Chip>
            );
        }

        if (uid === "creditLimit") {
            return <span className="text-default-500">{formatCurrency(item[uid])}</span>;
        }

        if (uid === "customerNumber") {
            return <span className="text-default-500 font-medium">{item[uid]}</span>;
        }

        return <span className="text-default-700">{item[uid as keyof ICustomersTableHome] ?? ""}</span>;
    }


    return <React.Fragment>
        {/*<ModalEliminacionExitosa isOpen={isOpenDelete} onOpenChange={onOpenChangeDelete}/>*/}
        <Table
            isCompact
            removeWrapper
            aria-label="Tabla de clientes con celdas personalizadas, paginación y ordenamiento"
            bottomContent={
                <TableBottomContent
                    pages={customersPage.metadata?.totalPages || 1}
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
                    customersLength={customers.length}
                    statusOptions={statusOptionsTableHome}
                />
            }
            topContentPlacement="outside"
            onSortChange={setSortDescriptor}
        >
            <TableHeader columns={columnsCustomersTableHome}>
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
            <TableBody emptyContent={"No se encontraron clientes"} items={sortedItems}>
                {(item) => (
                    <TableRow key={item.customerNumber}>{(columnKey) =>
                        <TableCell>{renderCell(columnKey as string, item)}</TableCell>}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    </React.Fragment>
}