"use client"

import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"

interface TableBottomProductsProps {
    currentPage: number
    totalPages: number
    totalElements: number
    onPageChange: (page: number) => void
}

export default function TableBottomProducts({
                                                currentPage,
                                                totalPages,
                                                totalElements,
                                                onPageChange,
                                            }: TableBottomProductsProps) {
    const handlePrevious = () => {
        if (currentPage > 0) {
            onPageChange(currentPage - 1)
        }
    }

    const handleNext = () => {
        if (currentPage < totalPages - 1) {
            onPageChange(currentPage + 1)
        }
    }

    const getVisiblePages = () => {
        const pages = []
        const maxVisiblePages = 5
        let startPage = Math.max(0, currentPage - Math.floor(maxVisiblePages / 2))
        const endPage = Math.min(totalPages - 1, startPage + maxVisiblePages - 1)

        if (endPage - startPage + 1 < maxVisiblePages) {
            startPage = Math.max(0, endPage - maxVisiblePages + 1)
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(i)
        }

        return pages
    }

    if (totalPages <= 1) return null

    return (
        <div className="flex items-center justify-between px-4 py-3 border-t">
            <div className="text-sm text-muted-foreground">
                Mostrando {currentPage * 5 + 1} - {Math.min((currentPage + 1) * 5, totalElements)} de {totalElements} productos
            </div>
            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious
                            onClick={handlePrevious}
                            className={currentPage === 0 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                        />
                    </PaginationItem>
                    {getVisiblePages().map((page) => (
                        <PaginationItem key={page}>
                            <PaginationLink
                                onClick={() => onPageChange(page)}
                                isActive={currentPage === page}
                                className="cursor-pointer"
                            >
                                {page + 1}
                            </PaginationLink>
                        </PaginationItem>
                    ))}
                    <PaginationItem>
                        <PaginationNext
                            onClick={handleNext}
                            className={currentPage >= totalPages - 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    )
}
