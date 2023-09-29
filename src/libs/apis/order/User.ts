"use client";

import { User } from "@/libs/types/user";

export function SignIn(userId: string): Promise<User> {
    const token: string = localStorage.getItem("user-id") || "";
    return fetch("https://ncth-app.jp:3939/v1/user/me/signin" + token ).then((res) => res.json());
}

export function SignUp(): Promise<User> {
    return fetch("https://ncth-app.jp:3939/v1/user/signup", {method: "POST"}).then((res) => res.json());
}