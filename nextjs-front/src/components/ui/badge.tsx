// badge.tsx
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
    "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold",
    {
        variants: {
            variant: {
                default: "bg-gray-100 text-gray-800",
                secondary: "bg-gray-200 text-gray-900",
                destructive: "bg-red-100 text-red-800",
                outline: "text-foreground border",
                success: "bg-green-100 text-green-800",
                warning: "bg-yellow-100 text-yellow-800",
                primary: "bg-blue-100 text-blue-800",   // agregado
                danger: "bg-red-200 text-red-900",     // agregado
            },
        },
        defaultVariants: {
            variant: "default",
        },
    }
)

export function Badge({ className, variant, ...props }: React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof badgeVariants>) {
    return <div className={cn(badgeVariants({ variant }), className)} {...props} />
}
