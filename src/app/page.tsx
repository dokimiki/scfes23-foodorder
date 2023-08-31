"use client";
import * as React from "react";
import Link from "next/link";

export default function HomePage() {
    return (
        <>
            <Link href="/I3/order/menus">お客さん側</Link>
            <br />
            <Link href="/I3/admin/regi">店員さん側</Link>
            <p>helllo</p>
        </>
    );
}
