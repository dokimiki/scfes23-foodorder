import { ReserveItem } from "./types/reserve";


export function getPotatoDate(): ReserveItem{
    return {
        receptionTime: new Date(),
        completionTime: new Date(),
        qty: 1,
    }
}
