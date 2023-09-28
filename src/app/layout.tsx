import * as React from "react";

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="jp">
            <body>{children}</body>
        </html>
    );
}
