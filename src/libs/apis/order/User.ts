"use client";

import { User } from "@/libs/types/user";
import jwtDecode from "jwt-decode";

export function SignIn(userId: string): Promise<User> {
    const jwt: string = localStorage.getItem("user-id") || "";
    const token: string = (jwtDecode(jwt) as any)?.sub || "";
    return fetch("https://ncth-app.jp:3939/v1/user/signin/" + token).then((res) => res.json());
}

export function SignUp(): Promise<User> {
    return fetch("https://ncth-app.jp:3939/v1/user/signup", { method: "POST" }).then((res) => res.json());
}
