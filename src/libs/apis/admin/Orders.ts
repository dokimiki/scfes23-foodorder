"use client";
import { Order } from "@/libs/types/order";
import { CartItem } from "../../types/item";

export function getCartDataFromOrderCode(orderCode: string): Promise<CartItem[]> {
    const mockResponse = [
        {
            id: "11",
            quantity: 2,
        },
        {
            id: "17",
            quantity: 1,
        },
    ];

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(mockResponse);
        }, 1000);
    });
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

export function sendOrderData(cart: CartItem[], orderCode: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(true);
        }, 1000);
    });
}
