import { CartItem } from "./item"

export type Order = {
    id: string;
    isMobileOrder: boolean;
    numberTag: number;
    items: CartItem[];
}
