"use client";
import * as React from "react";
import Head from "next/head";
import ThemeRegistry from "@/components/ThemeRegistry/ThemeRegistry";
import Header from "@/components/layouts/OrderHeader";
import Footer from "@/components/layouts/OrderFooter";

export const metadata = {
    title: "Next.js App Router + Material UI v5",
    description: "Next.js App Router + Material UI v5",
};

export default function Layout({ children, params }: { children: React.ReactNode; params: any }) {
    return (
        <html lang="jp">
            <Head>
                <title>文化祭フードオーダー</title>
            </Head>
            <body>
                <ThemeRegistry>
                    <Header
                        title={"小林トルネード(I3)"}
                        menuLink={"/" + params.shop_id + "/order/menus"}
                        cartLink={"/" + params.shop_id + "/order/cart"}
                        cartItemCount={2}
                    />
                    {children}
                    <Footer />
                </ThemeRegistry>
            </body>
        </html>
    );
}
