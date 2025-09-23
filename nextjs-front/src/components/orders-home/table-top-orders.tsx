"use client"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Plus, ChevronDown } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useHandleParams } from "@/hooks/use_handle_params"

interface TableTopOrdersProps {
    ordersLength: number
    statusOptions: Array<{ name: string; uid: string; color: string }>
    setIsNewOrderModalOpen: (open: boolean) => void
}

export function TableTopOrders({ ordersLength, statusOptions, setIsNewOrderModalOpen }: TableTopOrdersProps) {

    const { handleSearch, handleStatusFilter, statusFilter, query } = useHandleParams()

    return (
        <div className="flex flex-col gap-4">
            <div className="flex justify-between gap-3 items-end">
                <div className="flex gap-3">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                        <Input
                            placeholder="Buscar por número o cliente..."
                            className="pl-10 min-w-[200px]"
                            defaultValue={query || ""}
                            onChange={(e) => handleSearch(e.target.value)}
                        />
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm">
                                Estado <ChevronDown className="ml-2 h-4 w-4" />
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
                    <Button
                        onClick={() => {
                            setIsNewOrderModalOpen(true)
                        }}
                    >
                        <Plus className="h-4 w-4 mr-2" />
                        Nueva Orden
                    </Button>
                </div>
            </div>
            <div className="flex justify-between items-center">
                <span className="text-default-400 text-small">Total {ordersLength} órdenes</span>
            </div>
        </div>
    )
}
