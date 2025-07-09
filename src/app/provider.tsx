"use client";

import { SessionProvider } from "next-auth/react";
import { Toaster } from "sonner";

export function Provider({ children }: { children: React.ReactNode }) {
    return (
        <SessionProvider>
            <Toaster position="bottom-center" />
            {children}
        </SessionProvider>
    )
}