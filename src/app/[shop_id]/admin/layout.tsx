"use client";
import * as React from "react";
import Head from "next/head";
import ThemeRegistry from "@/components/ThemeRegistry/ThemeRegistry";
import Header from "@/components/layouts/AdminHeader";
import Footer from "@/components/layouts/AdminFooter";

export default function Layout({ children, params }: { children: React.ReactNode; params: any }) {
    return (
        <html lang="jp">
            <Head>
                <title>文化祭フードオーダー</title>
            </Head>
            <body>
                <ThemeRegistry>
                    <Header />
                    {children}
                    <Footer />
                </ThemeRegistry>
            </body>
        </html>
    );
}
