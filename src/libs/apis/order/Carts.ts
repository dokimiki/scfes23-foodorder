"use client";
import { CartItem } from "@/libs/types/item";

export function sendCartData(cart: CartItem[]): Promise<boolean> {
    const token: string = localStorage.getItem("user-id") || "";

    return fetch("https://ncth-app.jp:3939/v1/user/me/sendcartdata", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
        },
        body: JSON.stringify(cart),
    }).then((res) => {
        if (res.json().hasOwnProperty("message")) {
            throw new Error((res.json() as any).message);
        }
        return !!res;
    });
}
