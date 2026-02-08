"use client"
import React from "react";
import {Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious} from "@/components/ui/pagination";
import {usePagination} from "@/hooks/use_pagination";

export function getPaginationRange(
    current: number,
    total: number,
    maxVisible: number = 9 // número máximo de items en el paginador
): (number | string)[] {
    const safeTotal = Math.max(0, Math.floor(total))
    const effectiveMaxVisible = Math.max(5, Math.floor(maxVisible))

    if (safeTotal <= 0) {
        return []
    }

    const safeCurrent = Math.min(Math.max(1, Math.floor(current)), safeTotal)

    // caso base: pocas páginas -> mostrar todas
    if (safeTotal <= effectiveMaxVisible) {
        return Array.from({length: safeTotal}, (_, i) => i + 1)
    }

    const siblingCount = Math.max(0, Math.floor((effectiveMaxVisible - 5) / 2))
    const leftSiblingIndex = Math.max(safeCurrent - siblingCount, 2)
    const rightSiblingIndex = Math.min(safeCurrent + siblingCount, safeTotal - 1)

    const shouldShowLeftDots = leftSiblingIndex > 2
    const shouldShowRightDots = rightSiblingIndex < safeTotal - 1

    if (!shouldShowLeftDots && shouldShowRightDots) {
        const leftItemCount = effectiveMaxVisible - 2
        const leftRange = Array.from({length: leftItemCount}, (_, i) => i + 1)
        return [...leftRange, "...", safeTotal]
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
        const rightItemCount = effectiveMaxVisible - 2
        const rightRange = Array.from(
            {length: rightItemCount},
            (_, i) => safeTotal - rightItemCount + 1 + i
        )
        return [1, "...", ...rightRange]
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
        const middleRange = Array.from(
            {length: rightSiblingIndex - leftSiblingIndex + 1},
            (_, i) => leftSiblingIndex + i
        )
        return [1, "...", ...middleRange, "...", safeTotal]
    }

    return Array.from({length: safeTotal}, (_, i) => i + 1)
}

export const PaginationBottom = ({pages}: { pages: number }) => {

    const {goToPage, currentPage} = usePagination(pages)
    const totalPages = Math.max(0, Math.floor(pages))
    const safeCurrentPage = totalPages > 0 ? Math.min(Math.max(1, Math.floor(currentPage)), totalPages) : 1
    const paginationRange = totalPages > 0 ? getPaginationRange(safeCurrentPage, totalPages) : []

    const handleGoToPage = (page: number) => {
        if (totalPages === 0) return

        const nextPage = Math.min(Math.max(page, 1), totalPages)

        if (nextPage !== safeCurrentPage) {
            goToPage(nextPage)
        }
    }

    return <React.Fragment>

        <div className="py-3 px-2 flex justify-center">
            <Pagination>
                <PaginationContent>
                    {/* Botón anterior */}
                    <PaginationItem>
                        <PaginationPrevious
                            href="#"
                            onClick={(e) => {
                                e.preventDefault()
                                if (safeCurrentPage > 1) {
                                    handleGoToPage(safeCurrentPage - 1)
                                }
                            }}
                        />
                    </PaginationItem>

                    {/* Números de página con truncamiento */}
                    {paginationRange.map((page, i) =>
                        typeof page === "number" ? (
                            <PaginationItem key={i}>
                                <PaginationLink
                                    href="#"
                                    isActive={page === safeCurrentPage}
                                    onClick={(e) => {
                                        e.preventDefault()
                                        handleGoToPage(page)
                                    }}
                                >
                                    {page}
                                </PaginationLink>
                            </PaginationItem>
                        ) : (
                            <PaginationItem key={i}>
                                <PaginationEllipsis/>
                            </PaginationItem>
                        )
                    )}

                    {/* Botón siguiente */}
                    <PaginationItem>
                        <PaginationNext
                            href="#"
                            onClick={(e) => {
                                e.preventDefault()
                                if (totalPages > 0 && safeCurrentPage < totalPages) {
                                    handleGoToPage(safeCurrentPage + 1)
                                }
                            }}
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    </React.Fragment>
}