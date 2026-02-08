"use client";
import {usePathname, useRouter, useSearchParams} from "next/navigation"
import {useMemo} from "react"
import {useDebouncedCallback} from "use-debounce";

export const useHandleParams = () => {
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const {replace} = useRouter()

    const statusParam = searchParams.get("status")

    const statusFilter = useMemo(() => new Set(statusParam?.split(",") ?? []), [statusParam])

    const query  = searchParams.get("query");

    const sort = searchParams.get("sort");
    const dir = searchParams.get("dir");


    const handleStatusFilter = (uid: string) => {
        const newStatusFilter = new Set(statusFilter)

        // toggle
        if (newStatusFilter.has(uid)) {
            newStatusFilter.delete(uid)
        } else {
            newStatusFilter.add(uid)
        }

        const param = new URLSearchParams(searchParams)
        param.set("page", "1")

        if (newStatusFilter.size > 0) {
            param.set("status", Array.from(newStatusFilter).join(","))
        } else {
            param.delete("status")
        }

        replace(`${pathname}?${param.toString()}`)
    }

    const handleSearch = useDebouncedCallback((term: string) => {
        const param = new URLSearchParams(searchParams)

        param.set("page", "1")

        if (term) {
            param.set("query", term)
        } else {
            param.delete("query")
        }


        replace(`${pathname}?${param.toString()}`)
    }, 300);

    const handleLimitPage = (limit: string) => {
        const param = new URLSearchParams(searchParams);

        param.set('page', '1');
        param.set('limit', limit);

        replace(`${pathname}?${param.toString()}`);
    }

    const handleSort = (sortKey: string) => {
        const param = new URLSearchParams(searchParams);
        const currentSort = param.get("sort");
        const currentDir = param.get("dir");
        
        if (currentSort === sortKey) {
            // Toggle direction
            if (currentDir === "asc") {
                param.set("dir", "desc");
            } else {
                param.set("dir", "asc");
            }
        } else {
            // Set new sort key and default to ascending
            param.set("sort", sortKey);
            param.set("dir", "asc");
        }

        replace(`${pathname}?${param.toString()}`);
    }

    


    return {handleSearch, handleStatusFilter, handleLimitPage, statusFilter, query, handleSort, sort, dir}
}
