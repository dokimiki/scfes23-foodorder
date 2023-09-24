"use client";
import * as React from "react";
import Header from "@/components/layouts/OrderHeader";
import Footer from "@/components/layouts/OrderFooter";
import { Global } from "@emotion/react";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Global
                styles={{
                    main: {
                        padding: "20px",
                    },
                }}
            />
            <Header title={"小林トルネード(I3)"} homeLink={"/I3/order/menus"} />
            {children}
            <Footer />
        </>
    );
}
