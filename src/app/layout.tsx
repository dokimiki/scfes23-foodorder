"use client";
import * as React from "react";
import Head from "next/head";
import ThemeRegistry from "@/components/ThemeRegistry/ThemeRegistry";
import { css } from "@emotion/react";

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="jp">
            <body
                css={css`
                    height: 100vh;
                    overflow: scroll;
                    -webkit-overflow-scrolling: touch;
                `}
            >
                <Head>
                    <title>nextApp</title>
                    <meta name="apple-mobile-web-app-capable" content="yes" />
                </Head>
                <ThemeRegistry>{children}</ThemeRegistry>
                <div
                    css={css`
                        background: black;
                        position: fixed;
                        bottom: 0;
                    `}
                >
                    test
                </div>
            </body>
        </html>
    );
}
