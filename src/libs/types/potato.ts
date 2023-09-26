export type OrderedPotato = {
    receptionTime: Date;
    completionTime: Date;
    qty: number;
    order: {
        id: string;
        isMobileOrder: boolean;
        numberTag: number;
    };
};
