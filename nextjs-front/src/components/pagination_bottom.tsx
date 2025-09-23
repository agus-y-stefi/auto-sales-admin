import React from "react";
import {Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious} from "@/components/ui/pagination";
import {usePagination} from "@/hooks/use_pagination";

export function getPaginationRange(
    current: number,
    total: number,
    maxVisible: number = 9 // número fijo de items (incluyendo 1 y last)
): (number | string)[] {
    // caso base: pocas páginas -> mostrar todas
    if (total <= maxVisible) {
        return Array.from({length: total}, (_, i) => i + 1)
    }

    const firstPage = 1
    const lastPage = total
    const middleSlots = maxVisible - 2 // espacio entre first y last

    let range: (number | string)[] = []

    // zona inicial (pegado al comienzo)
    if (current <= middleSlots - 1) {
        const visible = Array.from({length: middleSlots}, (_, i) => i + 1)
        range = [...visible, "...", lastPage]
        return range
    }

    // zona final (pegado al final)
    if (current >= total - (middleSlots - 2)) {
        const visible = Array.from(
            {length: middleSlots},
            (_, i) => total - middleSlots + 1 + i
        )
        range = [firstPage, "...", ...visible]
        return range
    }

    // zona intermedia
    const sideSlots = middleSlots - 3 // ej: con maxVisible=7 → 4 slots → 1,…,[x-1,x,x+1],…,last
    const start = current - Math.floor(sideSlots / 2)
    const end = current + Math.floor(sideSlots / 2)

    range = [firstPage, "...", ...Array.from({length: end - start + 1}, (_, i) => start + i), "...", lastPage]

    return range
}

export const PaginationBottom = ({pages}: { pages: number }) => {

    const {goToPage, currentPage} = usePagination(pages);

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
                                if (currentPage > -2) goToPage(currentPage - 1)
                            }}
                        />
                    </PaginationItem>

                    {/* Números de página con truncamiento */}
                    {getPaginationRange(currentPage, pages - 3).map((page, i) =>
                        typeof page === "number" ? (
                            <PaginationItem key={i}>
                                <PaginationLink
                                    href="#"
                                    isActive={page === currentPage}
                                    onClick={(e) => {
                                        e.preventDefault()
                                        goToPage(page)
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
                                if (currentPage < pages - 3) goToPage(currentPage + 1)
                            }}
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    </React.Fragment>
}