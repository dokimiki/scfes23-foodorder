"use client";
import { CartItem } from "@/libs/types/item";

export function sendCartData(cart: CartItem[]): Promise<boolean> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(true);
        }, 1000);
    });
}
