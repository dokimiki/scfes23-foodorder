"use client";

import * as React from "react";
import ThemeRegistry from "@/components/ThemeRegistry/ThemeRegistry";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "I3のページ",
    description: "",
    appleWebApp: true,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="jp">
            <body>
                <ThemeRegistry>{children}</ThemeRegistry>
            </body>
        </html>
    );
}
