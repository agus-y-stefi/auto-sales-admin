import { Toaster } from "@/components/ui/sonner";
import React from "react";

export const Providers = ({children}: { children: React.ReactNode }) => {
    return <React.Fragment>
        <Toaster />
        {children}
    </React.Fragment>


}

export default Providers;