import { Card } from "@/components/ui/card";
import {Spinner} from "@/components/ui/spinner";

export default function Loading() {
    // Or a custom loading skeleton component
    return <div className="h-screen w-full flex items-center justify-center gap-5">
        <Spinner className="w-12 h-12" color="#1818a1"/>
        <p className="text-lg font-medium">Loading customer details...</p>
    </div>
    
}
