export function finishedSeasoning(orderId: string): Promise<boolean> {
    return fetch("https://ncth-app.jp:3939/v1/admin/finishedseasoning/" + orderId, { method: "POST" }).then((res) => res.json());
}
