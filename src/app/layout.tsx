"use client";

import * as React from "react";
import Head from "next/head";
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
                <Head>
                    <title>nextApp</title>
                    <meta name="apple-mobile-web-app-capable" content="yes" />
                </Head>
                <ThemeRegistry>{children}</ThemeRegistry>
            </body>
        </html>
    );
}
