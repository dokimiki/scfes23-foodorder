import { CartItem } from "./item"

export type order = {
    id: string;
    isMobileOrder: boolean;
    numberTag: number;
    items: CartItem[];
}
