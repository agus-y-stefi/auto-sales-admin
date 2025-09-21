"use client"
import {usePathname, useRouter, useSearchParams} from "next/navigation";

interface TableBottomContentProps {
    pages: number
}

export function TableBottomContent({
                                       pages,
                                   }: TableBottomContentProps) {

    const pathname = usePathname();
    const {replace} = useRouter()
    const searchParams = useSearchParams();

    const page = Number(searchParams.get('page')) || 1;

    const handlePageChange = (page: number) => {
        const param = new URLSearchParams(searchParams);

        if (page)
            param.set('page', page.toString());
        else
            param.delete('page', '1');

        replace(`${pathname}?${param.toString()}`);

    }


    return (
        <div className="py-2 px-2 flex justify-between items-center">
            <Pagination
                showControls
                classNames={{
                    cursor: "bg-foreground text-background",
                }}
                color="default"
                page={page}
                total={Math.floor(pages)}
                variant="light"
                onChange={handlePageChange}
            />
        </div>
    )
}

