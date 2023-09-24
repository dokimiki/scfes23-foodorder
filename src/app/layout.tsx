import * as React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "I3のページ",
    description: "",
    appleWebApp: true,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="jp">
            <body>{children}</body>
        </html>
    );
}
