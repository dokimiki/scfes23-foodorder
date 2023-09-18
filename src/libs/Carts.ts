import { CartItem } from "./types/item";
export const MAX_CART_ITEM_QUANTITY = 5;
export const MIN_CART_ITEM_QUANTITY = 0;

export function getCartDataFromOrderCode(orderCode: string): Promise<CartItem[]> {
    const mockResponse = new Response(
        JSON.stringify([
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
                quantity: 3,
            },
        ])
    );

    return mockResponse.json();
}
