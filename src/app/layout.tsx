import * as React from "react";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: any }): Promise<Metadata> {
    return {
        title: "I3の予約ページ",
        description: "",
        appleWebApp: true,
    };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="jp">
            <body>{children}</body>
        </html>
    );
}
