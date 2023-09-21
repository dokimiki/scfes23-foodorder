"use client";
import * as React from "react";
import Header from "@/components/layouts/AdminHeader";
import Footer from "@/components/layouts/AdminFooter";

export default function Layout({ children, params }: { children: React.ReactNode; params: any }) {
    return (
        <>
            <Header />
            {children}
            <Footer />
        </>
    );
}
