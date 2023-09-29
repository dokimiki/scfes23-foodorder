"use client";
import { MenuItem } from "@/libs/types/item";

export function getMenuItems(): Promise<MenuItem[]> {
    return fetch("https://ncth-app.jp:3939/v1/common/menus").then((res) => {
        const response = res.json();
        if (response.hasOwnProperty("message")) {
            throw new Error((response as any).message);
        }
        return response;
    });
}
