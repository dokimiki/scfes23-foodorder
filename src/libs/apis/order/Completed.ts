"use client";

import { CompleteInfo, CompleteState } from "@/libs/types/orderComplete";

export function getCompleteState(): Promise<CompleteState> {
    const mockResponse: CompleteState = {
        state: "Cooking",
    };

    return new Promise<CompleteState>((resolve, reject) => {
        setTimeout(() => {
            resolve(mockResponse);
        }, 1000);
    });
}

export function getCompleteInfo(): Promise<CompleteInfo> {
    const mockResponse: CompleteInfo = {
        barcode: "12345678912072313912",
        completeTime: "10:00",
        items: [
            {
                id: "1",
                quantity: 1,
            },
            {
                id: "2",
                quantity: 2,
            },
        ],
    };

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(mockResponse);
        }, 1000);
    });
}
