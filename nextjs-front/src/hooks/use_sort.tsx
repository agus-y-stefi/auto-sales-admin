import React from "react";
import type {SortDescriptor} from "@/contracts";

export function useSortedItems <T>(items: T[]) {
    const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
        column: "orderNumber",
        direction: "descending",
    })

    const sortedItems = React.useMemo(() => {
        return [...items].sort((a, b) => {
            const first = a[sortDescriptor.column as keyof T]
            const second = b[sortDescriptor.column as keyof T]
            const cmp = first < second ? -1 : first > second ? 1 : 0

            return sortDescriptor.direction === "descending" ? -cmp : cmp
        })
    }, [sortDescriptor, items])

    const handleSort = (column: string) => {
        setSortDescriptor((prev) => ({
            column,
            direction: prev.column === column && prev.direction === "ascending" ? "descending" : "ascending",
        }))
    }

    return { sortedItems, sortDescriptor, handleSort }
}
