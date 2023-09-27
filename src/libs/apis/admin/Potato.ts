import { OrderedPotato } from "../../types/potato";

export function getPotatoData(): Promise<OrderedPotato[]> {
    const data: OrderedPotato[] = Array(20)
        .fill(1)
        .map((e, i) => {
            let data: OrderedPotato = {
                receptionTime: new Date(new Date("2023/9/30 10:00").setMinutes(i * 5)),
                completionTime: new Date(new Date("2023/9/30 10:00").setMinutes(i * 5 + 10)),
                qty: ((i * 39) % 4) + 1,
                order: {
                    id: "" + i,
                    isMobileOrder: i % 2 === 0,
                    numberTag: i % 20,
                    isPaid: i % 3 === 0,
                },
            };
            return data;
        });

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(data);
        }, 1000);
    });
}
