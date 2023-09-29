"use client";

export function wasInvited(userId: string): Promise<boolean> {
    return fetch("https://ncth-app.jp:3939/v1/user/inviteregistry/" + userId, { method: "POST" }).then((res) => res.json());
}
