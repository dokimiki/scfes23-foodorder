export type CouponKind = "none" | "0" | "100" | "200" | "300";

export type Coupon = {
    kind: CouponKind;
};

export type CouponItemIds = {
    none: string | null;
    "0": string | null;
    "100": string | null;
    "200": string | null;
    "300": string | null;
};
