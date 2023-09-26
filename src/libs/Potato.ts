import { ReserveItem } from "./types/reserve";


export function getPotatoDate(){
    const data : ReserveItem[] = [   
        {
        receptionTime: new Date(new Date("2023/9/30 10:00").setMinutes(0, 0)),
        completionTime: new Date(new Date("2023/9/30 10:00").setMinutes(0, 0)),
        qty: 5
    },
    {
        receptionTime: new Date(),
        completionTime: new Date(),
        qty: 1,
    }
    ]
    return data;

}
