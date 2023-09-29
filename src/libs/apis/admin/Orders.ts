"use client";
import { Order } from "@/libs/types/order";
import { CartItem } from "../../types/item";

export function getCartDataFromOrderCode(orderCode: string): Promise<CartItem[]> {
    return fetch("https://ncth-app.jp:3939/v1/getcartdatafromordercode/" + orderCode).then((res) => res.json());
}

export function getOrderedCarts(): Promise<Order[]> {
    const mockResponse = [
        {
            id: "1",
            isMobileOrder: false,
            numberTag: 15,
            items: [
                {
                    id: "1",
                    quantity: 2,
                },
                {
                    id: "2",
                    quantity: 1,
                },
                {
                    id: "3",
                    quantity: 4,
                },
            ],
        },
        {
            id: "2",
            isMobileOrder: true,
            numberTag: 0,
            items: [
                {
                    id: "4",
                    quantity: 2,
                },
            ],
        },
    ];

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(mockResponse);
        }, 1000);
    });
}

export function sendOrderData(cart: CartItem[], orderCode: string, numTag: number): Promise<boolean> {
    const orderData: {cart: CartItem[]; orderCode: string; numTag: number} = {
        cart: cart,
        orderCode: orderCode,
        numTag: numTag
    }
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(true);
        }, 1000);
    });
}
