import { OrderedPotato } from "../../types/potato";

export function getPotatoData(): Promise<OrderedPotato[]> {
    const data: OrderedPotato[] = [
        {
            receptionTime: new Date(new Date("2023/9/30 10:00").setMinutes(0, 0)),
            completionTime: new Date(new Date("2023/9/30 10:00").setMinutes(0, 0)),
            qty: 5,
            order: {
                id: "1",
                isMobileOrder: false,
                numberTag: 1,
            },
        },
        {
            receptionTime: new Date(),
            completionTime: new Date(),
            qty: 1,
            order: {
                id: "2",
                isMobileOrder: true,
                numberTag: 2,
            },
        },
    ];

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(data);
        }, 1000);
    });
}
