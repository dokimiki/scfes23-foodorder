"use client";
import { CartItem, MenuItem } from "@/libs/types/item";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import * as React from "react";

export function CartMenu({ menus, cart }: { menus: MenuItem[]; cart: CartItem }) {
    const menu: MenuItem = menus.find((m) => m.id === cart.id) || { id: "", name: "", price: 0, image: "" };
    return (
        <div>
            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                sx={{
                    marginY: "0.5rem",
                }}
            >
                <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ width: "-webkit-fill-available" }}>
                    <Stack direction="row" spacing={1} alignItems="center">
                        <Avatar src={menu.image} sx={{ width: "4.3rem", height: "4.3rem" }} />
                        <Stack>
                            <Typography variant="body1">{menu.name}</Typography>
                            <Typography variant="h6">¥{menu.price.toLocaleString()}</Typography>
                        </Stack>
                    </Stack>

                    <Typography variant="h6" sx={{ marginRight: "8px" }}>
                        ✕ {cart.quantity}
                    </Typography>
                </Stack>

                <Typography variant="h5" sx={{ width: "6rem" }} align="right">
                    ¥{(menu.price * cart.quantity).toLocaleString()}
                </Typography>
            </Stack>
            <Divider />
        </div>
    );
}
