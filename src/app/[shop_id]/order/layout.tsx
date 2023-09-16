"use client";
import * as React from "react";
import Header from "@/components/layouts/OrderHeader";
import Footer from "@/components/layouts/OrderFooter";
import { Global } from "@emotion/react";

export default function Layout({ children, params }: { children: React.ReactNode; params: any }) {
    return (
        <>
            <Global
                styles={{
                    main: {
                        padding: "20px",
                    },
                }}
            />
            <Header title={"小林トルネード(I3)"} homeLink={"/" + params.shop_id + "/order/menus"} />
            {children}
            <Footer />
        </>
    );
}
