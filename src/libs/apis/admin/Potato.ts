"use client";
import { OrderedPotato } from "../../types/potato";

export function getPotatoData(): Promise<OrderedPotato[]> {
    return fetch("https://ncth-app.jp:3939/v1/admingetpotatodata").then((res) => res.json());
}
