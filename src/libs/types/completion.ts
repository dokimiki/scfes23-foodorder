import { escape } from "querystring";

export type CompletionTime = {
    CompTime: string;   

}

export type Completion =  "Cooked" | "Cooking";

export type CompletionList = {
    Completion: Completion;
    CompTime: CompletionTime;
};