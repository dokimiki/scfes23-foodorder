"use client";
import * as React from "react";
import Head from "next/head";
import ThemeRegistry from "@/components/ThemeRegistry/ThemeRegistry";
import Header from "@/components/layouts/OrderHeader";
import Footer from "@/components/layouts/OrderFooter";

export default function Layout({ children, params }: { children: React.ReactNode; params: any }) {
    return (
        <html lang="jp">
            <Head>
                <title>文化祭フードオーダー</title>
            </Head>
            <body>
                <ThemeRegistry>
                    <Header title={"小林トルネード(I3)"} homeLink={"/" + params.shop_id + "/order/menus"} />
                    {children}
                    <Footer />
                </ThemeRegistry>
            </body>
        </html>
    );
}
