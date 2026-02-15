import { CreditCard, TriangleAlert } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { getRecentPayments } from "@/contracts/orders-service/api";
import {
    RecentPaymentsTable,
    type RecentPaymentRow,
} from "@/components/customers/details/recent-payments-table";

interface RecentPaymentsLoaderProps {
    customerId: number;
}

function isRecord(value: unknown): value is Record<string, unknown> {
    return typeof value === "object" && value !== null;
}

function toNumber(value: unknown, fallback = 0): number {
    if (typeof value === "number" && Number.isFinite(value)) {
        return value;
    }

    if (typeof value === "string" && value.trim().length > 0) {
        const parsed = Number(value);
        return Number.isFinite(parsed) ? parsed : fallback;
    }

    return fallback;
}

function toString(value: unknown, fallback = "-"): string {
    return typeof value === "string" && value.trim().length > 0 ? value : fallback;
}

function toDateString(value: unknown, fallback = "-"): string {
    if (typeof value === "string" && value.trim().length > 0) {
        return value;
    }

    if (Array.isArray(value) && value.length >= 3) {
        const [year, month, day] = value;
        if (
            typeof year === "number" &&
            typeof month === "number" &&
            typeof day === "number" &&
            Number.isFinite(year) &&
            Number.isFinite(month) &&
            Number.isFinite(day)
        ) {
            const paddedMonth = String(month).padStart(2, "0");
            const paddedDay = String(day).padStart(2, "0");
            return `${year}-${paddedMonth}-${paddedDay}`;
        }
    }

    if (isRecord(value)) {
        const year = toNumber(value.year, NaN);
        const monthValue = toNumber(value.monthValue, NaN);
        const month = Number.isNaN(monthValue) ? toNumber(value.month, NaN) : monthValue;
        const dayValue = toNumber(value.dayOfMonth, NaN);
        const day = Number.isNaN(dayValue) ? toNumber(value.day, NaN) : dayValue;

        if (!Number.isNaN(year) && !Number.isNaN(month) && !Number.isNaN(day)) {
            const paddedMonth = String(month).padStart(2, "0");
            const paddedDay = String(day).padStart(2, "0");
            return `${year}-${paddedMonth}-${paddedDay}`;
        }
    }

    return fallback;
}

async function getRecentCustomerPayments(
    customerId: number,
    size = 5,
): Promise<RecentPaymentRow[]> {
    const response = await getRecentPayments(customerId, { size });

    if (response.status !== 200) {
        throw new Error(`Unexpected status when fetching recent payments: ${response.status}`);
    }

    if (!Array.isArray(response.data)) {
        return [];
    }

    return response.data
        .filter(isRecord)
        .map((payment) => ({
            checkNumber: toString(payment.checkNumber),
            paymentDate: toDateString(payment.paymentDate),
            amount: toNumber(payment.amount),
        }))
        .filter((payment) => payment.checkNumber !== "-");
}

function RecentPaymentsError() {
    return (
        <div className="bg-card rounded-xl border shadow-sm p-6 flex flex-col items-center justify-center text-center h-full min-h-[280px]">
            <TriangleAlert className="h-6 w-6 text-red-500 mb-3" />
            <h3 className="text-sm font-semibold text-foreground">No se pudieron cargar los pagos</h3>
            <p className="text-sm text-muted-foreground mt-2">Intenta nuevamente en unos minutos.</p>
        </div>
    );
}

export function RecentPaymentsSkeleton() {
    return (
        <div className="bg-card rounded-xl border shadow-sm overflow-hidden flex flex-col h-full min-h-[280px]">
            <div className="p-4 border-b border-border bg-muted/30 flex items-center gap-2">
                <CreditCard className="text-muted-foreground h-4 w-4" />
                <h3 className="text-sm font-semibold text-foreground">Últimos 5 Pagos</h3>
            </div>
            <div className="p-4 space-y-3">
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
            </div>
        </div>
    );
}

export async function RecentPaymentsLoader({ customerId }: RecentPaymentsLoaderProps) {
    let payments: RecentPaymentRow[];

    try {
        payments = await getRecentCustomerPayments(customerId, 5);
    } catch (error) {
        console.error("Error fetching recent payments", { customerId, error });
        return <RecentPaymentsError />;
    }

    return <RecentPaymentsTable customerId={customerId} payments={payments} />;
}
