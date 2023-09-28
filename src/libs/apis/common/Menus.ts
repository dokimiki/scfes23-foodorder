"use client";
import { MenuItem } from "@/libs/types/item";

export function getMenuItems(): Promise<MenuItem[]> {
    return fetch("https://ncth-app.jp:3939/v1/common/menus").then((res) => res.json());
}
