import { CartItem } from "../../types/item";

export function getCartDataFromOrderCode(orderCode: string): Promise<CartItem[]> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve([
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
            ]);
        }, 1000);
    });
}

export function sendCartData(cart: CartItem[], orderCode: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(true);
        }, 1000);
    });
}
