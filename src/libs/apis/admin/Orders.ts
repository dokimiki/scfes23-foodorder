"use client";
import { Order } from "@/libs/types/order";
import { CartItem } from "../../types/item";

export function getCartDataFromOrderCode(orderCode: string): Promise<CartItem[]> {
    return fetch("https://ncth-app.jp:3939/v1/admin/getcartdatafromordercode/" + orderCode, { method: "POST" }).then((res) => res.json());
}

export function getSeasoningData(): Promise<Order[]> {
    return fetch("https://ncth-app.jp:3939/v1/admin/getseasoningdata").then((res) => res.json());
}

export function sendOrderData(cart: CartItem[], orderCode: string, numTag: number): Promise<boolean> {
    const orderData: { cart: CartItem[]; orderCode: string; numTag: number } = {
        cart: cart,
        orderCode: orderCode,
        numTag: numTag,
    };

    return fetch("https://ncth-app.jp:3939/v1/admin/sendorderdata", {
        method: "post",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
    }).then((res) => res.json());
}
