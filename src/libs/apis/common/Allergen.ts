"use client";
import { AllergensList } from "@/libs/types/allergen";

export async function getAllergen(menuId: string): Promise<AllergensList> {
    const mockResponse: AllergensList = {
        ebi: menuId === "1" ? "Contains" : "NotContains",
        kani: "NotContains",
        komugi: "NotContains",
        kurumi: "NotContains",
        milk: "NotContains",
        peanut: "NotContains",
        soba: "NotContains",
        tamago: "NotContains",
    };

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(mockResponse);
        }, 1000);
    });
}
