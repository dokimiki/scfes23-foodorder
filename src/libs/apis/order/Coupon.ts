"use client";

import { Coupon, CouponItemIds } from "@/libs/types/coupon";

export function drawBulkLots(): Promise<Coupon> {
    const token: string = localStorage.getItem("user-id") || "";
    return fetch("https://ncth-app.jp:3939/v1/user/me/drawbulklots", {
        headers: { Authorization: "Bearer " + token },
    }).then((res) => {
        if (res.json().hasOwnProperty("message")) {
            throw new Error((res.json() as any).message);
        }
        return res.json();
    });
}

export function drawInviteLots(): Promise<Coupon> {
    const token: string = localStorage.getItem("user-id") || "";
    return fetch("https://ncth-app.jp:3939/v1/user/me/drawinvitelots", {
        headers: { Authorization: "Bearer " + token },
    }).then((res) => {
        if (res.json().hasOwnProperty("message")) {
            throw new Error((res.json() as any).message);
        }
        return res.json();
    });
}

export function getCouponItemIds(): Promise<CouponItemIds> {
    const token: string = localStorage.getItem("user-id") || "";
    return fetch("https://ncth-app.jp:3939/v1/user/me/getcouponitemids", {
        headers: { Authorization: "Bearer " + token },
    }).then((res) => {
        if (res.json().hasOwnProperty("message")) {
            throw new Error((res.json() as any).message);
        }
        return res.json();
    });
}
