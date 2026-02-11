"use client";

import { useQueryState } from "nuqs";
import { Search, LayoutGrid, List, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export function CustomersToolbar() {
    const [searchQuery, setSearchQuery] = useQueryState("q", {
        defaultValue: "",
        parse: (value) => value || "",
        shallow: false, // Update URL immediately
        throttleMs: 300,
    });

    const [statusFilter, setStatusFilter] = useQueryState("status", {
        defaultValue: "all",
        parse: (value) => value || "all",
        shallow: false,
    });

    const [, setPage] = useQueryState("page", {
        defaultValue: 1,
        parse: (value) => Number(value) || 1,
        shallow: false,
    });

    return (
        <div className="rounded-xl border bg-card text-card-foreground shadow-sm bg-white dark:bg-zinc-900 p-4">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                {/* Buscador */}
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Buscar cliente, ID o empresa..."
                        className="pl-9 bg-background"
                        value={searchQuery}
                        onChange={(e) => {
                            setSearchQuery(e.target.value);
                            setPage(1); // Reset page on search
                        }}
                    />
                </div>

                {/* Filtro de Estado */}
                <Select
                    value={statusFilter}
                    onValueChange={(value) => {
                        setStatusFilter(value);
                        setPage(1); // Reset page on filter change
                    }}
                >
                    <SelectTrigger className="w-full sm:w-44 bg-background">
                        <SelectValue placeholder="Todos los Estados" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">Todos los Estados</SelectItem>
                        <SelectItem value="Active">Activo</SelectItem>
                        <SelectItem value="Inactive">Inactivo</SelectItem>
                        <SelectItem value="Pending">Pendiente</SelectItem>
                    </SelectContent>
                </Select>

                {/* Spacer */}
                <div className="hidden sm:flex flex-1" />

                {/* Botones de vista y exportar */}
                <div className="flex items-center gap-2">
                    <div className="flex items-center border rounded-md bg-background">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-9 w-9 rounded-none rounded-l-md border-r hover:bg-muted"
                        >
                            <List className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-9 w-9 rounded-none rounded-r-md hover:bg-muted text-muted-foreground"
                        >
                            <LayoutGrid className="h-4 w-4" />
                        </Button>
                    </div>

                    <Button variant="outline" size="sm" className="h-9 gap-1.5 bg-background">
                        <Download className="h-4 w-4" />
                        Exportar
                    </Button>
                </div>
            </div>
        </div>
    );
}
