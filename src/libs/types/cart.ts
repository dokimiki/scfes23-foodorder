import { CartItem } from "./item"

export type Cart = {
    id: string;
    isMobileOrder: boolean;
    numberTag: number;
    items: CartItem[];
}
