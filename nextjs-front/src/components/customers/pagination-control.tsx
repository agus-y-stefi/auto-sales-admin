"use client";

import { useQueryState } from "nuqs";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

interface PaginationControlProps {
    totalPages: number;
    totalElements: number;
}

export function PaginationControl({ totalPages, totalElements }: PaginationControlProps) {
    const [page, setPage] = useQueryState("page", {
        defaultValue: 1,
        parse: (value) => Number(value) || 1,
        shallow: false,
    });

    const [size, setSize] = useQueryState("size", {
        defaultValue: 10,
        parse: (value) => Number(value) || 10,
        shallow: false,
    });

    // Helper para generar array de páginas a mostrar
    const getPageNumbers = () => {
        const delta = 2;
        const range = [];
        const rangeWithDots = [];
        let l;

        range.push(1);
        for (let i = page - delta; i <= page + delta; i++) {
            if (i < totalPages && i > 1) {
                range.push(i);
            }
        }
        if (totalPages > 1) {
            range.push(totalPages);
        }

        for (const i of range) {
            if (l) {
                if (i - l === 2) {
                    rangeWithDots.push(l + 1);
                } else if (i - l !== 1) {
                    rangeWithDots.push("...");
                }
            }
            rangeWithDots.push(i);
            l = i;
        }

        return rangeWithDots;
    };

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setPage(newPage);
        }
    };

    const handlePageSizeChange = (newSize: string) => {
        setSize(Number(newSize));
        setPage(1); // Reset a primera página al cambiar tamaño
    };

    const startItem = (page - 1) * size + 1;
    const endItem = Math.min(page * size, totalElements);

    return (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 w-full">
            {/* Información de resultados y selección de tamaño */}
            <div className="flex items-center gap-4 text-sm text-muted-foreground order-2 sm:order-1">
                <span>
                    Mostrando {startItem} a {endItem} de {totalElements} resultados
                </span>
                <div className="flex items-center gap-2">
                    <span>Items por página</span>
                    <Select value={String(size)} onValueChange={handlePageSizeChange}>
                        <SelectTrigger className="h-8 w-18">
                            <SelectValue placeholder={String(size)} />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="10">10</SelectItem>
                            <SelectItem value="20">20</SelectItem>
                            <SelectItem value="50">50</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {/* Navegación */}
            <div className="order-1 sm:order-2">
                <Pagination>
                    <PaginationContent>
                        {/* Primera Página */}
                        <PaginationItem>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                disabled={page === 1}
                                onClick={() => handlePageChange(1)}
                            >
                                <ChevronsLeft className="h-4 w-4" />
                            </Button>
                        </PaginationItem>

                        {/* Anterior */}
                        <PaginationItem>
                            <Button
                                variant="ghost"
                                size="sm"
                                disabled={page === 1}
                                onClick={() => handlePageChange(page - 1)}
                                className="gap-1 pl-2.5"
                            >
                                <ChevronLeft className="h-4 w-4" />
                                <span>Anterior</span>
                            </Button>
                        </PaginationItem>

                        {/* Números de página */}
                        {getPageNumbers().map((pageNum, idx) => (
                            <PaginationItem key={idx}>
                                {pageNum === "..." ? (
                                    <PaginationEllipsis />
                                ) : (
                                    <Button
                                        variant={page === pageNum ? "outline" : "ghost"}
                                        size="icon"
                                        className="h-8 w-8"
                                        onClick={() => handlePageChange(Number(pageNum))}
                                    >
                                        {pageNum}
                                    </Button>
                                )}
                            </PaginationItem>
                        ))}

                        {/* Siguiente */}
                        <PaginationItem>
                            <Button
                                variant="ghost"
                                size="sm"
                                disabled={page === totalPages}
                                onClick={() => handlePageChange(page + 1)}
                                className="gap-1 pr-2.5"
                            >
                                <span>Siguiente</span>
                                <ChevronRight className="h-4 w-4" />
                            </Button>
                        </PaginationItem>

                        {/* Última Página */}
                        <PaginationItem>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                disabled={page === totalPages}
                                onClick={() => handlePageChange(totalPages)}
                            >
                                <ChevronsRight className="h-4 w-4" />
                            </Button>
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>
        </div>
    );
}
