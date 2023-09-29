"use client";

import { User } from "@/libs/types/user";
import jwtDecode from "jwt-decode";

export function SignIn(userId: string): Promise<User> {
    const jwt: string = localStorage.getItem("user-id") || "";
    let token: string;
    try {
        token = (jwtDecode(jwt) as any).sub;
    } catch (e) {
        token = "none";
    }
    return fetch("https://ncth-app.jp:3939/v1/user/signin/" + token).then((res) => {
        const response = res.json();
        if (response.hasOwnProperty("message")) {
            throw new Error((response as any).message);
        }
        return response;
    });
}

export function SignUp(): Promise<User> {
    return fetch("https://ncth-app.jp:3939/v1/user/signup", { method: "POST" }).then((res) => {
        const response = res.json();
        if (response.hasOwnProperty("message")) {
            throw new Error((response as any).message);
        }
        return response;
    });
}
