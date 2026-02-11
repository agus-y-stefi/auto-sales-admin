import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
    status: "Active" | "Inactive" | "Pending";
}

const statusConfig = {
    Active: {
        label: "Activo",
        classes: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    },
    Inactive: {
        label: "Inactivo",
        classes: "bg-gray-100 text-gray-600 dark:bg-gray-800/50 dark:text-gray-400",
    },
    Pending: {
        label: "Pendiente",
        classes: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
    },
};

export function StatusBadge({ status }: StatusBadgeProps) {
    const config = statusConfig[status];
    return (
        <Badge variant="outline" className={cn("text-xs font-medium border-0", config.classes)}>
            {config.label}
        </Badge>
    );
}
