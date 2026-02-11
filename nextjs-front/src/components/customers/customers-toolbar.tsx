"use client";

import { useQueryState } from "nuqs";
import { Search } from "lucide-react";
import { useDebouncedCallback } from "use-debounce";

import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { searchParamsParsers } from "@/app/customers/search-params";

export function CustomersToolbar() {
    // shallow: false forces a server-side navigation (refresh)
    const [q, setQ] = useQueryState("q", { ...searchParamsParsers.q, shallow: false });
    const [status, setStatus] = useQueryState("status", {
        ...searchParamsParsers.status,
        shallow: false,
    });
    const [, setPage] = useQueryState("page", { ...searchParamsParsers.page, shallow: false });

    const handleSearch = useDebouncedCallback((term: string) => {
        setQ(term || null);
        setPage(1); // Reset to page 1 on search
    }, 300);

    const handleStatusChange = (val: string) => {
        setStatus(val === "all" ? null : val);
        setPage(1); // Reset to page 1 on filter
    };

    return (
        <div className="bg-card rounded-xl border shadow-sm p-4 space-y-4 md:space-y-0 md:flex md:items-center md:justify-between gap-4">
            {/* Search + Filter Group */}
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto flex-1">
                <div className="relative w-full sm:w-80">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Buscar cliente, ID o empresa..."
                        className="pl-9 bg-background/50"
                        defaultValue={q ?? ""}
                        onChange={(e) => handleSearch(e.target.value)}
                    />
                </div>

                <Select value={status ?? "all"} onValueChange={handleStatusChange}>
                    <SelectTrigger className="w-full sm:w-[180px] bg-background/50">
                        <SelectValue placeholder="Todos los Estados" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">Todos los Estados</SelectItem>
                        <SelectItem value="active">Activo</SelectItem>
                        <SelectItem value="inactive">Inactivo</SelectItem>
                        <SelectItem value="new">Nuevo</SelectItem>
                        <SelectItem value="vip">VIP</SelectItem>
                        <SelectItem value="overdue">Moroso</SelectItem>
                        <SelectItem value="review">En Revisión</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
}
