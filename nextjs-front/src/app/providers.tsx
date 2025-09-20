import {HeroUIProvider, ToastProvider} from "@heroui/react";
import React from "react";

export const Providers = ({children}: { children: React.ReactNode }) => {
    return (
        <HeroUIProvider>
            <ToastProvider/>
            {children}
        </HeroUIProvider>
    )

}

export default Providers;