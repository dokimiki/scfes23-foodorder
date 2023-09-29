"use client";
import { AllergensList } from "@/libs/types/allergen";

export async function getAllergen(menuId: string): Promise<AllergensList> {
    return fetch("https://ncth-app.jp:3939/v1/common/allergens/" + menuId).then((res) => {
        if (res.hasOwnProperty("message")) {
            throw new Error((res as any).message);
        }
        return res.json();
    });
}
