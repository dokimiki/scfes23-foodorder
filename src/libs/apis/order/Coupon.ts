"use client";

import { Coupon, CouponItemIds } from "@/libs/types/coupon";
import { resolve } from "path";

export function drawBulkLots(): Promise<Coupon> {
    const token: string = localStorage.getItem("user-id") || "";
    return new Promise(() => {
        setTimeout(() => {
            fetch("https://ncth-app.jp:3939/v1/user/me/drawbulklots", {
                headers: { Authorization: "Bearer " + token },
            }).then((res) => res.json());
        }, 1000);
    });
}

export function drawInviteLots(): Promise<Coupon> {
    const token: string = localStorage.getItem("user-id") || "";
    return fetch("https://ncth-app.jp:3939/v1/user/me/drawinvitelots", {
        headers: { Authorization: "Bearer " + token },
    }).then((res) => res.json());
}

export function getCouponItemIds(): Promise<CouponItemIds> {
    const token: string = localStorage.getItem("user-id") || "";
    return fetch("https://ncth-app.jp:3939/v1/user/me/getcouponitemids", {
        headers: { Authorization: "Bearer " + token },
    }).then((res) => res.json());
}
