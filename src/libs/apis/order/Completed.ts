"use client";

import { CompleteInfo, CompleteState } from "@/libs/types/orderComplete";

export function getCompleteState(): Promise<CompleteState> {
    const token: string = localStorage.getItem("user-id") || "";
    return fetch("https://ncth-app.jp:3939/v1/user/me/getcompletestate", {
  headers: { 'Authorization': 'Bearer: ' + token} } ).then((res) => res.json());
}

export function getCompleteInfo(): Promise<CompleteInfo> {
    const mockResponse: CompleteInfo = {
        barcode: "12345678912072313912",
        completeTime: "18:00",
        items: [
            {
                id: "11",
                quantity: 2,
            },
            {
                id: "17",
                quantity: 1,
            },
        ],
    };

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(mockResponse);
        }, 1000);
    });
}
