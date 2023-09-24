"use client";
import * as React from "react";
import Header from "@/components/layouts/AdminHeader";
import Footer from "@/components/layouts/AdminFooter";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Header />
            {children}
            <Footer />
        </>
    );
}
