import {usePathname, useRouter, useSearchParams} from "next/navigation";

export const usePagination = (pages: number) => {
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const {replace} = useRouter()

    const currentPage = Number(searchParams.get("page") ?? "1")

    const goToPage = (page: number) => {
        const params = new URLSearchParams(searchParams)
        params.set("page", page.toString())
        replace(`${pathname}?${params.toString()}`)
    }

    return {currentPage, goToPage}
}
