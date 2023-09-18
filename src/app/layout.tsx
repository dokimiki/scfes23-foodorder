"use client";
import * as React from "react";
import Head from "next/head";
import ThemeRegistry from "@/components/ThemeRegistry/ThemeRegistry";

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="jp">
            <body>
                <Head>
                    <title>nextApp</title>
                </Head>
                <ThemeRegistry>{children}</ThemeRegistry>
            </body>
        </html>
    );
}
