import React from "react"
import {Select, SelectTrigger, SelectValue, SelectItem, SelectContent} from "@/components/ui/select"

import {useHandleParams} from "@/hooks/use_handle_params";
import {PageMetadata} from "@/contracts"

export const TableSizeBottom = ({pageInfo} : {pageInfo : PageMetadata}) =>{

    const {handleLimitPage} = useHandleParams();
    const {totalPages, number, size, totalElements} = pageInfo;

    const firstElement = (number || 0) * (size || 1) + 1;
    const lastElement = Math.min(((number || 0) + 1) * (size || 1), totalElements || 0);


    return <React.Fragment>
        <div className="border-t bg-background hover:bg-muted/50 transition-colors">
            <div className="px-4 py-3 flex items-center justify-between">
                <div className="flex flex-col gap-1 text-sm text-muted-foreground">
                    <p>Página {firstElement} - {lastElement} de {totalElements} órdenes</p>
                </div>

                <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Mostrar</span>
                    <Select value={size?.toString() || "5"} onValueChange={handleLimitPage}>
                        <SelectTrigger className="w-[70px]">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="5">5</SelectItem>
                            <SelectItem value="10">10</SelectItem>
                            <SelectItem value="25">25</SelectItem>
                            <SelectItem value="50">50</SelectItem>
                            <SelectItem value="100">100</SelectItem>
                        </SelectContent>
                    </Select>
                    <span className="text-sm text-muted-foreground">por página</span>
                </div>
            </div>
        </div>
    </React.Fragment>
}