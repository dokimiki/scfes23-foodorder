"use client";

import { User } from "@/libs/types/user";

export function SignIn(userId: string): Promise<User> {
    const mockResponse = {
        id: "abcde",
        isOrdered: false,
    };

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(mockResponse);
        }, 1000);
    });
}

export function SignUp(): Promise<User> {
    return fetch("https://ncth-app.jp:3939/v1/user/signup").then((res) => res.json());
}