"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Plus, ChevronDown } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useHandleParams } from "@/hooks/use_handle_params";
import { statusOptionsTableHome } from "@/lib/config/tables/customer-home.config";
import { useState } from "react";
import { NewCustomerModal } from "./new/new-customer-modal";
import { TableHead } from "../ui/table";

interface TableTopContentProps {
    customersLength: number;
}

export function TableTopContent({ customersLength }: TableTopContentProps) {
    const [isNewCustomerModalOpen, setIsNewCustomerModalOpen] = useState(false);

    const { query, statusFilter, handleStatusFilter, handleSearch } =
        useHandleParams();

    return (
        <div className="flex flex-col gap-4">
            <NewCustomerModal
                open={isNewCustomerModalOpen}
                onOpenChange={setIsNewCustomerModalOpen}
            />
            <div className="flex justify-between gap-3 items-end">
                <div className="flex gap-3">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                        <Input
                            placeholder="Buscar por nombre..."
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
                            {statusOptionsTableHome.map((status) => (
                                <DropdownMenuCheckboxItem
                                    key={status.uid}
                                    checked={statusFilter.has(status.uid)}
                                    onCheckedChange={() =>
                                        handleStatusFilter(status.uid)
                                    }
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
                            setIsNewCustomerModalOpen(true);
                        }}
                    >
                        <Plus className="h-4 w-4 mr-2" />
                        Nuevo Cliente
                    </Button>
                </div>
            </div>
            <div className="flex justify-between items-center">
                <span className="text-default-400 text-small">
                    Total {customersLength} clientes
                </span>
            </div>
        </div>
    );
}