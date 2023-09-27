"use client";

import { Coupon, CouponItemIds } from "@/libs/types/coupon";

export function drawBulkLots(): Promise<Coupon> {
    const mockResponse: Coupon = {
        kind: Math.random() < 0.5 ? "0" : "100",
    };

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(mockResponse);
        }, 1000);
    });
}

export function drawInviteLots(): Promise<Coupon> {
    const mockResponse: Coupon = {
        kind: Math.random() < 0.5 ? "0" : "300",
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
        "100": "7",
        "200": "8",
        "300": "9",
    };

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(mockResponse);
        }, 1000);
    });
}
