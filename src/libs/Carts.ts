import { CartItem } from "./types/item";
export const MAX_CART_ITEM_QUANTITY = 5;
export const MIN_CART_ITEM_QUANTITY = 0;

export function getCartDataFromOrderCode(orderCode: string): Promise<CartItem[]> {
    const mockResponse = new Response(
        JSON.stringify([
            {
                id: "1",
                quantity: Math.round(Math.random() * 5) * Math.round(Math.random() * 1),
            },
            {
                id: "2",
                quantity: Math.round(Math.random() * 5) * Math.round(Math.random() * 1),
            },
            {
                id: "3",
                quantity: Math.round(Math.random() * 5) * Math.round(Math.random() * 1),
            },
            {
                id: "4",
                quantity: Math.round(Math.random() * 5) * Math.round(Math.random() * 1),
            },
            {
                id: "5",
                quantity: Math.round(Math.random() * 5) * Math.round(Math.random() * 1),
            },
        ])
    );

    return mockResponse.json();
}

export function sendCartData(cart: CartItem[], orderCode: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(true);
        }, 1000);
    });
}
