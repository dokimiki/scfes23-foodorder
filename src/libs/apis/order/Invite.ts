"use client";

export function wasInvited(userId: string): Promise<boolean> {
    return fetch("https://ncth-app.jp:3939/v1/user/inviteregistry/" + userId, { method: "POST" }).then((res) => {
        if (res.hasOwnProperty("message")) {
            throw new Error((res as any).message);
        }
        return !!res;
    });
}
