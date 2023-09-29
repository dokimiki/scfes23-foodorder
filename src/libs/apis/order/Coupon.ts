"use client";

import { Coupon, CouponItemIds } from "@/libs/types/coupon";

export function drawBulkLots(): Promise<Coupon> {
    const token: string = localStorage.getItem("user-id") || "";
    return fetch("https://ncth-app.jp:3939/v1/user/me/drawbulklots", {
        headers: { Authorization: "Bearer " + token },
    }).then((res) => {
        const response = res.json();
        if (response.hasOwnProperty("message")) {
            throw new Error((response as any).message);
        }
        return response;
    });
}

export function drawInviteLots(): Promise<Coupon> {
    const token: string = localStorage.getItem("user-id") || "";
    return fetch("https://ncth-app.jp:3939/v1/user/me/drawinvitelots", {
        headers: { Authorization: "Bearer " + token },
    }).then((res) => {
        const response = res.json();
        console.log(response);
        console.log(response.hasOwnProperty("message"));
        if (response.hasOwnProperty("message")) {
            console.log("true");
            throw new Error((response as any).message);
        }
        return response;
    });
}

export function getCouponItemIds(): Promise<CouponItemIds> {
    const token: string = localStorage.getItem("user-id") || "";
    return fetch("https://ncth-app.jp:3939/v1/user/me/getcouponitemids", {
        headers: { Authorization: "Bearer " + token },
    }).then((res) => {
        const response = res.json();
        if (response.hasOwnProperty("message")) {
            throw new Error((response as any).message);
        }
        return response;
    });
}
