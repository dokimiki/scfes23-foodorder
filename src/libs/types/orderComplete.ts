import { CartItem } from "./item";

export type CompleteState = {
    state: "Cooking" | "Cooked" | "Delivered";
};

export type CompleteInfo = {
    barcode: string;
    completeTime: string;
    items: CartItem[];
};
