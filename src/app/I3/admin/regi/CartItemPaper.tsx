import Stepper from "@/components/Stepper";
import { MIN_CART_ITEM_QUANTITY } from "@/libs/apis/admin/Carts";
import { CartItem, MenuItem } from "@/libs/types/item";
import { Global } from "@emotion/react";
import { Delete } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import * as React from "react";

export function CartItemPaper({
    itemMenuInfo,
    itemCartInfo = { id: "", quantity: 0 },
    addToCart,
    removeFromCart,
}: {
    itemMenuInfo: MenuItem;
    itemCartInfo?: CartItem;
    addToCart: () => void;
    removeFromCart: () => void;
}) {
    return (
        <div>
            <Global
                styles={{
                    ".cart-item-paper": {
                        transition: "max-height 2s cubic-bezier(0.2, 0.3, 0.8, 0.7), margin-bottom 0.2s ease-out !important",
                        overflow: "hidden",
                        height: "fit-content",
                        marginBottom: "8px",
                        maxHeight: "100vh",
                    },
                    ".cart-item-paper-hidden": {
                        transition: "max-height 2s cubic-bezier(0.2, 0.3, 0.8, 0.7), margin-bottom 0.2s ease-out 2.2s !important",
                        maxHeight: "0px",
                        marginBottom: 0,
                    },
                }}
            />
            <Paper className={"cart-item-paper" + (itemCartInfo.quantity <= MIN_CART_ITEM_QUANTITY ? " cart-item-paper-hidden" : "")}>
                <Stack sx={{ margin: 1 }}>
                    <Typography variant="h6">{itemMenuInfo?.name ?? "なぞ"}</Typography>
                </Stack>

                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ margin: 1 }}>
                    <Stack direction="row" alignItems="flex-end">
                        <Typography variant="subtitle1">合計:&nbsp;</Typography>
                        <Typography variant="h5">¥{((itemMenuInfo?.price ?? 0) * itemCartInfo.quantity).toLocaleString()}</Typography>
                    </Stack>

                    <Stepper
                        num={itemCartInfo.quantity}
                        onClickAdd={() => addToCart()}
                        onClickRemove={() => removeFromCart()}
                        size="medium"
                    />
                </Stack>
            </Paper>
        </div>
    );
}
