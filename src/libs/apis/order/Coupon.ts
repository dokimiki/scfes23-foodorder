"use client";

import { Coupon, CouponItemIds } from "@/libs/types/coupon";

export function drawBulkLots(): Promise<Coupon> {
    const mockResponse: Coupon = {
        kind: "0",
    };

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(mockResponse);
        }, 1000);
    });
}

export function drawInviteLots(): Promise<Coupon> {
    const mockResponse: Coupon = {
        kind: "200",
    };

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(mockResponse);
        }, 1000);
    });
}

export function getCouponItemIds(): Promise<CouponItemIds> {
    const mockResponse: CouponItemIds = {
        none: null,
        "0": null,
        "100": "16",
        "200": "17",
        "300": "18",
    };

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(mockResponse);
        }, 1000);
    });
}
