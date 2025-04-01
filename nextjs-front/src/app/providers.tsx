import {HeroUIProvider} from "@heroui/react";
import React from "react";

export const Providers = ({children} : {children:React.ReactNode}) =>{
    return (
        <HeroUIProvider>
            {children}
        </HeroUIProvider>
    )

}

export default Providers;