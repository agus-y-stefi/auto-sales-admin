import { Toaster } from "@/components/ui/sonner";

import React from "react";
import { SidebarProvider } from "@/components/ui/sidebar";

export const Providers = ({ children }: { children: React.ReactNode }) => {
    return (
        <React.Fragment>
            <SidebarProvider defaultOpen={false}>
                <Toaster />
                {children}
            </SidebarProvider>
        </React.Fragment>
    );
};

export default Providers;
