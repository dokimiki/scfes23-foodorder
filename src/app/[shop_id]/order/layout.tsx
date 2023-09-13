"use client";
import * as React from "react";
import Header from "@/components/layouts/OrderHeader";
import Footer from "@/components/layouts/OrderFooter";

export default function Layout({ children, params }: { children: React.ReactNode; params: any }) {
    return (
        <>
            <Header title={"小林トルネード(I3)"} homeLink={"/" + params.shop_id + "/order/menus"} />
            {children}
            <Footer />
        </>
    );
}
