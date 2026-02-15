import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface StockBadgeProps {
    quantity: number;
}

export function StockBadge({ quantity }: StockBadgeProps) {
    const config = getStockConfig(quantity);

    return (
        <Badge
            variant="outline"
            className={cn("text-xs font-medium border-0 tabular-nums", config.classes)}
        >
            {quantity.toLocaleString("en-US")}
        </Badge>
    );
}

function getStockConfig(quantity: number): { classes: string } {
    if (quantity === 0) {
        return {
            classes: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
        };
    }
    if (quantity < 100) {
        return {
            classes: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
        };
    }
    if (quantity < 1000) {
        return {
            classes: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
        };
    }
    return {
        classes: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    };
}
