"use client";
import { OrderedPotato } from "../../types/potato";

export function getPotatoData(): Promise<OrderedPotato[]> {
    return fetch("https://ncth-app.jp:3939/v1/admin/getpotatodata").then((res) => {
        const response = res.json();
        if (response.hasOwnProperty("message")) {
            throw new Error((response as any).message);
        }
        return response;
    });
}
