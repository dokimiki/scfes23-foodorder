"use client";
import * as React from "react";
import Header from "@/components/layouts/AdminHeader";
import Footer from "@/components/layouts/AdminFooter";
import ThemeRegistry from "@/components/ThemeRegistry/ThemeRegistry";

export default function Layout({ children, params }: { children: React.ReactNode; params: any }) {
    return (
        <ThemeRegistry>
            <Header />
            {children}
            <Footer />
        </ThemeRegistry>
    );
}
