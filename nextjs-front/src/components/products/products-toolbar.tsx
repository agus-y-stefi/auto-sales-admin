"use client";

import { useQueryState } from "nuqs";
import { Search, X } from "lucide-react";
import { useDebouncedCallback } from "use-debounce";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { searchParamsParsers } from "@/app/products/search-params";

interface ProductsToolbarProps {
    productLines: string[];
    scaleOptions: string[];
}

export function ProductsToolbar({ productLines, scaleOptions }: ProductsToolbarProps) {
    const [q, setQ] = useQueryState("q", { ...searchParamsParsers.q, shallow: false });
    const [productLine, setProductLine] = useQueryState("productLine", {
        ...searchParamsParsers.productLine,
        shallow: false,
    });
    const [productScale, setProductScale] = useQueryState("productScale", {
        ...searchParamsParsers.productScale,
        shallow: false,
    });
    const [, setPage] = useQueryState("page", { ...searchParamsParsers.page, shallow: false });

    const handleSearch = useDebouncedCallback((term: string) => {
        setQ(term || null);
        setPage(1);
    }, 300);

    const handleLineChange = (val: string) => {
        setProductLine(val === "all" ? null : val);
        setPage(1);
    };

    const handleScaleChange = (val: string) => {
        setProductScale(val === "all" ? null : val);
        setPage(1);
    };

    const hasFilters = q || productLine || productScale;

    const handleReset = () => {
        setQ(null);
        setProductLine(null);
        setProductScale(null);
        setPage(1);
    };

    return (
        <div className="bg-card rounded-xl border shadow-sm p-4 space-y-4 md:space-y-0 md:flex md:items-center md:justify-between gap-4">
            {/* Search + Filter Group */}
            <div className="flex flex-col sm:flex-row gap-3 w-full flex-1">
                <div className="relative w-full sm:w-80">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Buscar por código o nombre..."
                        className="pl-9 bg-background/50"
                        defaultValue={q ?? ""}
                        onChange={(e) => handleSearch(e.target.value)}
                    />
                </div>

                <Select value={productLine || "all"} onValueChange={handleLineChange}>
                    <SelectTrigger className="w-full sm:w-[200px] bg-background/50">
                        <SelectValue placeholder="Todas las Líneas" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">Todas las Líneas</SelectItem>
                        {productLines.map((line) => (
                            <SelectItem key={line} value={line}>
                                {line}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <Select value={productScale || "all"} onValueChange={handleScaleChange}>
                    <SelectTrigger className="w-full sm:w-[150px] bg-background/50">
                        <SelectValue placeholder="Todas las Escalas" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">Todas las Escalas</SelectItem>
                        {scaleOptions.map((scale) => (
                            <SelectItem key={scale} value={scale}>
                                {scale}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                {hasFilters && (
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleReset}
                        className="text-muted-foreground hover:text-foreground"
                    >
                        <X className="h-4 w-4 mr-1" />
                        Limpiar
                    </Button>
                )}
            </div>
        </div>
    );
}
