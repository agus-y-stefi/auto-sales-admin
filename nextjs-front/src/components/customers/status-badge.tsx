import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
    status: string;
}

const statusConfig: Record<string, { label: string; classes: string }> = {
    active: {
        label: "Activo",
        classes: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    },
    inactive: {
        label: "Inactivo",
        classes: "bg-gray-100 text-gray-600 dark:bg-gray-800/50 dark:text-gray-400",
    },
    new: {
        label: "Nuevo",
        classes: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    },
    vip: {
        label: "VIP",
        classes: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
    },
    overdue: {
        label: "Moroso",
        classes: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
    },
    review: {
        label: "En Revisión",
        classes: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
    },
};

const defaultConfig = {
    label: "Desconocido",
    classes: "bg-gray-100 text-gray-500 dark:bg-gray-800/50 dark:text-gray-400",
};

export function StatusBadge({ status }: StatusBadgeProps) {
    const config = statusConfig[status?.toLowerCase()] ?? defaultConfig;
    return (
        <Badge variant="outline" className={cn("text-xs font-medium border-0", config.classes)}>
            {config.label}
        </Badge>
    );
}
