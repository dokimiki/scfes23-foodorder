import { CartItem } from "./item";

export type CompleteStateKind = "Cooking" | "Cooked" | "Delivered";

export type CompleteState = {
    state: CompleteStateKind;
};

export type CompleteInfo = {
    barcode: string;
    completeTime: string;
    items: CartItem[];
};
