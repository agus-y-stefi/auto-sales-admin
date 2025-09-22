"use client"
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import {usePathname, useRouter, useSearchParams} from "next/navigation";

interface TableBottomContentProps {
    pages: number
}

export function TableBottomCustomers({ pages }: TableBottomContentProps) {
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const { replace } = useRouter()

    const currentPage = Number(searchParams.get("page") ?? "1")

    const goToPage = (page: number) => {
        const params = new URLSearchParams(searchParams)
        params.set("page", page.toString())
        replace(`${pathname}?${params.toString()}`)
    }

    return (
        <div className="py-3 px-2 flex justify-center">
            <Pagination>
                <PaginationContent>
                    {/* Botón anterior */}
                    <PaginationItem>
                        <PaginationPrevious
                            href="#"
                            onClick={(e) => {
                                e.preventDefault()
                                if (currentPage > 1) goToPage(currentPage - 1)
                            }}
                        />
                    </PaginationItem>

                    {/* Números de página */}
                    {Array.from({ length: pages }, (_, i) => {
                        const page = i + 1
                        return (
                            <PaginationItem key={page}>
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
                        )
                    })}

                    {/* Botón siguiente */}
                    <PaginationItem>
                        <PaginationNext
                            href="#"
                            onClick={(e) => {
                                e.preventDefault()
                                if (currentPage < pages) goToPage(currentPage + 1)
                            }}
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    )
}