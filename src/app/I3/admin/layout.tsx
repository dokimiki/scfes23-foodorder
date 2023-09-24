"use client";
import * as React from "react";
import ThemeRegistry from "@/components/ThemeRegistry/ThemeRegistry";
import Header from "@/components/layouts/AdminHeader";
import Footer from "@/components/layouts/AdminFooter";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Header />
            <ThemeRegistry>{children}</ThemeRegistry>
            <Footer />
        </>
    );
}
