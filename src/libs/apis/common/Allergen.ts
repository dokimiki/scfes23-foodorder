"use client";
import { AllergensList } from "@/libs/types/allergen";

export async function getAllergen(menuId: string): Promise<AllergensList> {
    return fetch("https://ncth-app.jp:3939/v1/common/allergens/" + menuId).then((res) => {
        const response = res.json();
        if (response.hasOwnProperty("message")) {
            throw new Error((response as any).message);
        }
        return response;
    });
}
