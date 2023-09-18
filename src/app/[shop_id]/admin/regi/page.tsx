"use client";
import Stepper from "@/components/Stepper";
import { MAX_CART_ITEM_QUANTITY, MIN_CART_ITEM_QUANTITY, getCartDataFromOrderCode } from "@/libs/Carts";
import { getMenuItems } from "@/libs/Items";
import { CartItem, MenuItem } from "@/libs/types/item";
import { Global, css } from "@emotion/react";
import { Delete, Smartphone } from "@mui/icons-material";
import AppBar from "@mui/material/AppBar";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import useTheme from "@mui/material/styles/useTheme";
import useMediaQuery from "@mui/material/useMediaQuery";
import * as React from "react";

// レジのページ

export default function Regi() {
    const theme = useTheme();
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

    const numKeyDown = React.useCallback((event: any) => {
        if (event.keyCode >= 48 && event.keyCode <= 57) {
            document.getElementById("barcode-input")?.focus();
        }
    }, []);

    React.useEffect(() => {
        document.addEventListener("keydown", numKeyDown, false);
    }, [numKeyDown]);

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
            newCart.splice(index, 1);
            setCart(newCart);
        }
    }

    const toolbarStyle = theme.mixins.toolbar;

    const isMinWidthZero = useMediaQuery("(min-width:0px)");
    const isMinWidth600 = useMediaQuery("(min-width:600px)");
    const isOrientationLand = useMediaQuery("(orientation:landscape)");

    const toolbarHeight = (() => {
        if (isMinWidthZero) {
            if (isOrientationLand) {
                return (toolbarStyle["@media (min-width:0px)"] as any)["@media (orientation: landscape)"].minHeight;
            }
        }
        if (isMinWidth600) {
            return (toolbarStyle["@media (min-width:600px)"] as any).minHeight;
        }
        return toolbarStyle.minHeight;
    })();

    const sideBarWidth = 350;

    return (
        <main
            css={css`
                min-height: 100vh;
            `}
        >
            <AppBar position="fixed">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        レジ
                    </Typography>
                </Toolbar>
            </AppBar>
            <Toolbar />

            <Stack direction="row" justifyContent="space-between" sx={{ width: "100%" }}>
                <Stack sx={{ margin: "16px", width: `calc(100% - ${sideBarWidth}px - 32px)` }}>
                    <form
                        noValidate
                        autoComplete="off"
                        onSubmit={(event: any) => {
                            event.preventDefault();
                            getCartDataFromOrderCode(event.target[0].value)
                                .then((res) => {
                                    setCart(res);
                                })
                                .catch((err) => {
                                    console.log(err);
                                });
                            event.target[0].value = "";
                            document.getElementById("barcode-input")?.blur();
                        }}
                    >
                        <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                            <Smartphone sx={{ color: "action.active", mr: 1, my: 0.5 }} />
                            <TextField id="barcode-input" label="バーコード入力" variant="standard" fullWidth />
                        </Box>
                    </form>

                    <Stack direction="row" flexWrap="wrap" alignContent="flex-start" justifyContent="flex-start">
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
                </Stack>

                <Stack
                    sx={{
                        position: "fixed",
                        right: 0,
                        height: `calc(100vh - ${toolbarHeight}px - 16px)`,
                        background: (theme) => {
                            return theme.palette.primary.main;
                        },
                        padding: "16px",
                        width: `${sideBarWidth}px`,
                        zIndex: 1,
                    }}
                    justifyContent="space-between"
                    spacing={2}
                >
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Typography variant="h5" fontWeight="bold">
                            注文内容
                        </Typography>
                        <Button
                            variant="contained"
                            color="error"
                            onClick={() => {
                                setCart([]);
                            }}
                        >
                            注文リセット
                        </Button>
                    </Stack>

                    <Stack sx={{ overflowY: "auto" }}>
                        {menus.map((e, i) => {
                            return (
                                <CartItemPaper
                                    itemMenuInfo={e}
                                    itemCartInfo={cart.find((cart) => cart.id === e.id)}
                                    addToCart={() => addToCart(e.id)}
                                    removeFromCart={() => removeFromCart(e.id)}
                                    deleteFromCart={() => deleteFromCart(e.id)}
                                    key={i}
                                />
                            );
                        })}
                    </Stack>
                    <div
                        css={css`
                            margin-top: auto !important;
                        `}
                    >
                        <Divider sx={{ marginBottom: 2, marginTop: 2 }} />
                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                            <Typography variant="h5" fontWeight="bold">
                                合計({cart.reduce((qty, cur) => qty + cur.quantity, 0)}点)
                            </Typography>
                            <Typography variant="h5" fontWeight="bold">
                                ¥{cart.reduce((acc, cur) => acc + (menus.find((e) => e.id === cur.id)?.price ?? 0) * cur.quantity, 0)}
                            </Typography>
                        </Stack>
                    </div>
                </Stack>
            </Stack>
        </main>
    );
}

function MenuItemPaper({
    itemMenuInfo,
    itemCartInfo = { id: "", quantity: 0 },
    addToCart,
}: {
    itemMenuInfo: MenuItem;
    itemCartInfo?: CartItem;
    addToCart: () => void;
}) {
    return (
        <Button onClick={addToCart} sx={{ margin: 2, padding: 0 }}>
            <Badge
                badgeContent={itemCartInfo.quantity}
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
    itemCartInfo = { id: "", quantity: 0 },
    addToCart,
    removeFromCart,
    deleteFromCart,
}: {
    itemMenuInfo: MenuItem;
    itemCartInfo?: CartItem;
    addToCart: () => void;
    removeFromCart: () => void;
    deleteFromCart: () => void;
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
                        <Typography variant="h5">¥{(itemMenuInfo?.price ?? 0) * itemCartInfo.quantity}</Typography>
                    </Stack>
                    <Stack direction="row">
                        <IconButton aria-label="delete" onClick={() => deleteFromCart()}>
                            <Delete fontSize="small" color="error" />
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
