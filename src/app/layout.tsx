"use client";
import * as React from "react";
import Head from "next/head";
import ThemeRegistry from "@/components/ThemeRegistry/ThemeRegistry";

export const metadata = {
    title: "Next.js App Router + Material UI v5",
    description: "Next.js App Router + Material UI v5",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="jp">
            <Head>
                <title>nextApp</title>
            </Head>
            <body>
                <ThemeRegistry>{children}</ThemeRegistry>
            </body>
        </html>
    );
}
