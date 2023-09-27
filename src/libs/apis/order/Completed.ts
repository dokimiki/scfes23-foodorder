import { CompleteState } from "@/libs/types/orderComplete";

export function getCompleteState(): Promise<CompleteState> {
    const mockResponse: CompleteState = {
        state: "Cooking",
    };

    return new Promise<CompleteState>((resolve, reject) => {
        setTimeout(() => {
            resolve(mockResponse);
        }, 1000);
    });
}

export function getCompleteBarcode(): Promise<string> {
    const mockResponse = Array.from({ length: 24 }, () => Math.floor(Math.random() * 10)).join("");

    return new Promise<string>((resolve, reject) => {
        setTimeout(() => {
            resolve(mockResponse);
        }, 1000);
    });
}
