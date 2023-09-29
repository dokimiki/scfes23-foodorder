"use client";
import { CartItem } from "@/libs/types/item";

export function sendCartData(cart: CartItem[]): Promise<boolean> {
    const token: string = localStorage.getItem("user-id") || "";
    return fetch("https://ncth-app.jp:3939/v1/user/me/sendcartdata/" + JSON.stringify(cart), {
        method: "POST",
        headers: { Authorization: "Bearer " + token },
    }).then((res) => !!res);
}
