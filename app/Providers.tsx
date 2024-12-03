"use client"

import { QueryClientProvider } from "@tanstack/react-query";
import { getQueryClient } from "./getQueryClient";
import { PropsWithChildren } from "react";

interface ProvidersProps extends PropsWithChildren {
}

export default function Providers({children}: ProvidersProps) {
    return (
        <QueryClientProvider client={getQueryClient()}>
            {children}
        </QueryClientProvider>
    )
}