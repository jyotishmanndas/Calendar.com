"use client";

import { SessionProvider } from "next-auth/react";
import { RecoilRoot } from "recoil";
import { Toaster } from "sonner";

export function Provider({ children }: { children: React.ReactNode }) {
    return (
        <SessionProvider>
            <RecoilRoot>
                <Toaster position="bottom-center" />
                {children}
            </RecoilRoot>
        </SessionProvider>
    )
}