import { Suspense } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CustomersTable } from "@/components/customers/customers-table";
import { PaginationControl } from "@/components/customers/pagination-control";
import { CustomersToolbar } from "@/components/customers/customers-toolbar";
import { columns } from "@/components/customers/columns";
import { getCustomers } from "@/lib/api/customers-api";
import { searchParamsCache } from "./search-params";
import { SearchParams } from "nuqs/server";

interface PageProps {
    searchParams: Promise<SearchParams>;
}

export default async function CustomersPage({ searchParams }: PageProps) {
    // Parse search params using nuqs cache
    const { page, size, q, status } = searchParamsCache.parse(await searchParams);

    // Fetch data (simulated DB call)
    const { content, totalElements, totalPages } = await getCustomers({
        page,
        size,
        q,
        status,
    });

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Cartera de Clientes</h1>
                    <p className="text-sm text-muted-foreground mt-1">
                        Gestiona y visualiza la información de tus clientes activos.
                    </p>
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white shadow-none">
                    <Plus className="mr-2 h-4 w-4" />
                    Nuevo Cliente
                </Button>
            </div>

            {/* Toolbar Card */}
            <Suspense>
                <CustomersToolbar />
            </Suspense>

            {/* Table Card */}
            <div className="rounded-xl border bg-card text-card-foreground shadow-sm dark:bg-zinc-900 overflow-hidden">
                <div>
                    <CustomersTable columns={columns} data={content} />
                </div>

                <div className="p-4 border-t bg-muted/5 dark:bg-muted/10">
                    <Suspense>
                        <PaginationControl totalPages={totalPages} totalElements={totalElements} />
                    </Suspense>
                </div>
            </div>
        </div>
    );
}
