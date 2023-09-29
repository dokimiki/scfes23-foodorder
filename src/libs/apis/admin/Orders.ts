"use client";
import { Order } from "@/libs/types/order";
import { CartItem } from "../../types/item";

export function getCartDataFromOrderCode(orderCode: string): Promise<CartItem[]> {
    return fetch("https://ncth-app.jp:3939/v1/admin/getcartdatafromordercode/" + orderCode, { method: "POST" }).then((res) => {
        const response = res.json();
        if (response.hasOwnProperty("message")) {
            throw new Error((response as any).message);
        }
        return response;
    });
}

export function getOrderedCarts(): Promise<Order[]> {
    return fetch("https://ncth-app.jp:3939/v1/admin/getorderedcarts").then((res) => {
        const response = res.json();
        if (response.hasOwnProperty("message")) {
            throw new Error((response as any).message);
        }
        return response;
    });
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
    }).then((res) => {
        const response = res.json();
        if (response.hasOwnProperty("message")) {
            throw new Error((response as any).message);
        }
        return response;
    });
}
