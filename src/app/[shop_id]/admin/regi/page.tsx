"use client";
import * as React from "react";
import { Global, css } from "@emotion/react";
import { Badge, Button, Card, CardMedia, Paper, Stack, Typography, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Stepper from "@/components/Stepper";
import { enqueueSnackbar } from "notistack";
import { getMenuItems } from "@/libs/Items";
import { CartItem, MenuItem } from "@/libs/types/item";
import { MAX_CART_ITEM_QUANTITY, MIN_CART_ITEM_QUANTITY } from "@/libs/Carts";
// レジのページ

export default function Regi() {
    const [menus, setMenus] = React.useState<MenuItem[]>([]);

    React.useEffect(() => {
        getMenuItems()
            .then((res) => {
                setMenus(res);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const [cart, setCart] = React.useState([] as CartItem[]);

    function addToCart(id: string) {
        const index = cart.findIndex((e) => e.id === id);
        if (index === -1) {
            setCart([...cart, { id: id, quantity: 1 }]);
        } else {
            const newCart = cart.slice();
            newCart[index].quantity++;
            newCart[index].quantity = Math.min(newCart[index].quantity, MAX_CART_ITEM_QUANTITY);
            setCart(newCart);
        }
    }

    function removeFromCart(id: string) {
        const index = cart.findIndex((e) => e.id === id);
        if (index === -1) {
            return;
        } else {
            const newCart = cart.slice();
            newCart[index].quantity--;
            newCart[index].quantity = Math.max(newCart[index].quantity, MIN_CART_ITEM_QUANTITY);
            if (newCart[index].quantity <= MIN_CART_ITEM_QUANTITY) {
                enqueueSnackbar((menus.find((e) => e.id === newCart[index].id)?.name ?? "なぞ") + "をカートから削除しました。", {
                    variant: "info",
                });

                newCart.splice(index, 1);
            }
            setCart(newCart);
        }
    }

    function deleteFromCart(id: string) {
        const index = cart.findIndex((e) => e.id === id);
        if (index === -1) {
            return;
        } else {
            const newCart = cart.slice();

            enqueueSnackbar((menus.find((e) => e.id === newCart[index].id)?.name ?? "なぞ") + "をカートから削除しました。", {
                variant: "info",
            });

            newCart.splice(index, 1);
            setCart(newCart);
        }
    }

    const sideBarWidth = 350;

    return (
        <main>
            <Stack direction="row" justifyContent="space-between" sx={{ width: "100%", height: "100vh" }}>
                <Stack
                    sx={{ margin: 2, width: `calc(100% - ${sideBarWidth}px)` }}
                    direction="row"
                    flexWrap="wrap"
                    alignContent="flex-start"
                    justifyContent="flex-start"
                >
                    {menus.map((e, i) => {
                        return (
                            <MenuItemPaper
                                itemMenuInfo={e}
                                itemCartInfo={cart.find((cart) => cart.id === e.id)}
                                addToCart={() => addToCart(e.id)}
                                key={i}
                            />
                        );
                    })}
                </Stack>
                <Stack
                    sx={{
                        position: "fixed",
                        right: 0,
                        height: "100%",
                        overflowY: "scroll",
                        background: (theme) => {
                            return theme.palette.primary.main;
                        },
                        padding: 2,
                        width: `${sideBarWidth}px`,
                    }}
                >
                    {cart.map((e, i) => {
                        return (
                            <CartItemPaper
                                itemMenuInfo={menus.find((menu) => menu.id === e.id)}
                                itemCartInfo={e}
                                addToCart={() => addToCart(e.id)}
                                removeFromCart={() => removeFromCart(e.id)}
                                deleteFromCart={() => deleteFromCart(e.id)}
                                key={i}
                            />
                        );
                    })}
                </Stack>
            </Stack>
        </main>
    );
}

function MenuItemPaper({
    itemMenuInfo,
    itemCartInfo,
    addToCart,
}: {
    itemMenuInfo: MenuItem;
    itemCartInfo?: CartItem;
    addToCart: () => void;
}) {
    return (
        <Button onClick={addToCart} sx={{ margin: 2, padding: 0 }}>
            <Badge
                badgeContent={itemCartInfo?.quantity ?? 0}
                color="primary"
                css={css`
                    & > .MuiBadge-badge {
                        width: 30px;
                        height: 30px;
                        border-radius: 15px;
                        font-size: 17px;
                        font-weight: 400;
                    }
                `}
            >
                <Card sx={{ width: 200 }}>
                    <CardMedia sx={{ height: 160 }} image={itemMenuInfo.image} />
                    <Stack sx={{ padding: "16px" }}>
                        <Typography gutterBottom variant="body2" fontWeight="500" align="left">
                            {itemMenuInfo.name}
                        </Typography>
                        <Stack direction="row" alignItems="baseline">
                            <Typography variant="body2" fontWeight="400">
                                売価:&nbsp;
                            </Typography>
                            <Typography variant="h6" fontWeight="500">
                                ¥{itemMenuInfo.price}
                            </Typography>
                        </Stack>
                    </Stack>
                </Card>
            </Badge>
        </Button>
    );
}

function CartItemPaper({
    itemMenuInfo,
    itemCartInfo,
    addToCart,
    removeFromCart,
    deleteFromCart,
}: {
    itemMenuInfo?: MenuItem;
    itemCartInfo: CartItem;
    addToCart: () => void;
    removeFromCart: () => void;
    deleteFromCart: () => void;
}) {
    return (
        <div>
            <Global
                styles={{
                    ".cart-item-paper": {},
                }}
            />
            <Paper
                className={"cart-item-paper" + (itemCartInfo.quantity <= MIN_CART_ITEM_QUANTITY ? " cart-item-paper-hidden" : "")}
                sx={{
                    transition:
                        "max-height 2s cubic-bezier(0.2, 0.3, 0.8, 0.7)" +
                        ", margin-bottom 0.2s ease-out" +
                        (itemCartInfo.quantity > 0 ? "" : " 2.2s"),
                    overflow: "hidden",
                    height: "auto",
                    maxHeight: itemCartInfo.quantity > 0 ? "100vh" : "0px",
                    marginBottom: itemCartInfo.quantity > 0 ? 2 : 0,
                }}
            >
                <Typography variant="h6">{itemMenuInfo?.name ?? "なぞ"}</Typography>
                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ margin: 1 }}>
                    <Stack direction="row" alignItems="flex-end">
                        <Typography variant="subtitle1">合計:&nbsp;</Typography>
                        <Typography variant="h5">¥{(itemMenuInfo?.price ?? 0) * itemCartInfo.quantity}</Typography>
                    </Stack>
                    <Stack direction="row">
                        <IconButton aria-label="delete" onClick={() => deleteFromCart()}>
                            <DeleteIcon fontSize="small" color="error" />
                        </IconButton>
                        <Stepper
                            num={itemCartInfo.quantity}
                            onClickAdd={() => addToCart()}
                            onClickRemove={() => removeFromCart()}
                            size="small"
                        />
                    </Stack>
                </Stack>
            </Paper>
        </div>
    );
}
