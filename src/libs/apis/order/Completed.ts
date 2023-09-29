"use client";

import { CompleteInfo, CompleteState } from "@/libs/types/orderComplete";

export function getCompleteState(): Promise<CompleteState> {
    const token: string = localStorage.getItem("user-id") || "";
    return fetch("https://ncth-app.jp:3939/v1/user/me/getcompletestate", {
        headers: { Authorization: "Bearer " + token },
    }).then((res) => res.json());
}

export function getCompleteInfo(): Promise<CompleteInfo> {
    const token: string = localStorage.getItem("user-id") || "";
    return fetch("https://ncth-app.jp:3939/v1/user/me/getcompleteinfo", {
        headers: { Authorization: "Bearer " + token },
    }).then((res) => res.json());
}
