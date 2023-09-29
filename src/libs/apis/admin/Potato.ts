"use client";
import { OrderedPotato } from "../../types/potato";

export function getPotatoData(): Promise<OrderedPotato[]> {
    return fetch("https://ncth-app.jp:3939/v1/admin/getpotatodata").then((res) => res.json());
}

export function finishedFrying(orderId: string): Promise<boolean> {
    return fetch("https://ncth-app.jp:3939/v1/admin/finishedfrying/" + orderId, {
        method: "POST",
    }).then((res) => res.json());
}
