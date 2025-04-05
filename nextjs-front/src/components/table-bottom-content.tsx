"use client"
import { Pagination } from "@heroui/react"

interface TableBottomContentProps {
  selectedKeys: Set<string | number>
  items: any[]
  page: number
  pages: number
  hasSearchFilter: boolean
  setPage: (page: number) => void
}

export function TableBottomContent({
  selectedKeys,
  items,
  page,
  pages,
  hasSearchFilter,
  setPage,
}: TableBottomContentProps) {
  return (
    <div className="py-2 px-2 flex justify-between items-center">
      <Pagination
        showControls
        classNames={{
          cursor: "bg-foreground text-background",
        }}
        color="default"
        isDisabled={hasSearchFilter}
        page={page}
        total={pages}
        variant="light"
        onChange={setPage}
      />
    </div>
  )
}

