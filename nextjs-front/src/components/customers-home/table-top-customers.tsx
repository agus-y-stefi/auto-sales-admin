"use client"
import {Input} from "@/components/ui/input"
import {Button} from "@/components/ui/button"
import {Search, Plus, Filter, ChevronDownIcon, ChevronDown} from "lucide-react"
import {usePathname, useRouter, useSearchParams} from "next/navigation"
import {useMemo, useState} from "react"
import {useDebouncedCallback} from "use-debounce";
import {DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {capitalize} from "@mui/material"

interface TableTopContentProps {
    customersLength: number
    statusOptions: Array<{ name: string; uid: string; color: string }>
    setIsNewCustomerModalOpen: (open: boolean) => void
}

export function TableTopContent({customersLength, statusOptions, setIsNewCustomerModalOpen}: TableTopContentProps) {

    const searchParams = useSearchParams();
    const pathname = usePathname();
    const {replace} = useRouter()

    const statusParam = searchParams.get("status")
    const statusFilter = useMemo(
        () => new Set(statusParam?.split(",") ?? []),
        [statusParam]
    )

    const handleStatusFilter = (uid: string) => {
        const newStatusFilter = new Set(statusFilter)

        // toggle
        if (newStatusFilter.has(uid)) {
            newStatusFilter.delete(uid)
        } else {
            newStatusFilter.add(uid)
        }

        const param = new URLSearchParams(searchParams)
        param.set("page", "1")

        if (newStatusFilter.size > 0) {
            param.set("status", Array.from(newStatusFilter).join(","))
        } else {
            param.delete("status")
        }

        replace(`${pathname}?${param.toString()}`)
    }

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

    const handleLimitPage = (limit: number) => {
        const param = new URLSearchParams(searchParams);

        param.set('page', '1');
        param.set('limit', limit.toString());

        replace(`${pathname}?${param.toString()}`);
    }

    return (
        <div className="flex flex-col gap-4">
            <div className="flex justify-between gap-3 items-end">
                <div className="flex gap-3">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4"/>
                        <Input placeholder="Buscar por nombre..." className="pl-10 min-w-[200px]"
                               defaultValue={searchParams.get('query') || ''} onChange={(e) => handleSearch(e.target.value)}
                        />
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm">
                                Estado <ChevronDown className="ml-2 h-4 w-4"/>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-48">
                            {statusOptions.map((status) => (
                                <DropdownMenuCheckboxItem
                                    key={status.uid}
                                    checked={statusFilter.has(status.uid)}
                                    onCheckedChange={() => handleStatusFilter(status.uid)}
                                >
                                    {status.name}
                                </DropdownMenuCheckboxItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                <div className="flex gap-3">
                    <Button onClick={() => {
                        setIsNewCustomerModalOpen(true)
                    }}>
                        <Plus className="h-4 w-4 mr-2"/>
                        Nuevo Cliente
                    </Button>
                </div>
            </div>
            <div className="flex justify-between items-center">
                <span className="text-default-400 text-small">Total {customersLength} clientes</span>
            </div>
        </div>
    )
}