"use client";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useHandleParams } from "@/hooks/use_handle_params";
import { ClearableInput } from "@/components/ui/clearable-input";
import { NewOrderModal } from "./new/new-order-modal";
import { statusOptionsOrdersTableHome } from "@/lib/config/tables/order-home.config";

export function TableTopOrders() {
    const { handleStatusFilter, statusFilter } = useHandleParams();

    const statusOptions = statusOptionsOrdersTableHome;

    return (
        <div className="flex justify-between gap-3 items-end">
            <div className="flex gap-3">
                <ClearableInput />
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
                <NewOrderModal />
            </div>
        </div>
    );
}
