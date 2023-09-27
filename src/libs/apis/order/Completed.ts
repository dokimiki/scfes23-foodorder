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
