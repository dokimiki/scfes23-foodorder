"use client";
import { OrderedPotato } from "../../types/potato";

export function getPotatoData(): Promise<OrderedPotato[]> {
    return fetch("https://ncth-app.jp:3939/v1/admin/getpotatodata").then((res) => {
        if (res.json().hasOwnProperty("message")) {
            throw new Error((res.json() as any).message);
        }
        return res.json();
    });
}
