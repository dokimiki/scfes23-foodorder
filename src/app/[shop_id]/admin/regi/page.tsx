"use client";
import { MIN_CART_ITEM_QUANTITY, getCartDataFromOrderCode, sendCartData } from "@/libs/Carts";
import { getMenuItems } from "@/libs/Items";
import { CartItem, MenuItem } from "@/libs/types/item";
import { css } from "@emotion/react";
import { Smartphone } from "@mui/icons-material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import useTheme from "@mui/material/styles/useTheme";
import useMediaQuery from "@mui/material/useMediaQuery";
import { enqueueSnackbar } from "notistack";
import * as React from "react";
import { MenuItemPaper } from "./MenuItemPaper";
import { CartItemPaper } from "./CartItemPaper";
import CircularProgress from "@mui/material/CircularProgress";

const MAX_CART_ITEM_QUANTITY = 99;

export default function Regi() {
    const theme = useTheme();
    const [menus, setMenus] = React.useState<MenuItem[]>([]);
    const [orderCode, setOrderCode] = React.useState<string>("");
    const [isSending, setIsSending] = React.useState<boolean>(false);

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
                <Stack sx={{ padding: "16px", width: `calc(100% - ${sideBarWidth}px - 32px)`,height: `calc(100vh - ${toolbarHeight}px - 16px)`, }}>
                    <Typography variant="body1" sx={{ marginBottom: 1 }}>
                        注文コード: {orderCode === "" ? "なし" : orderCode}
                    </Typography>
                    <form
                        noValidate
                        autoComplete="off"
                        onSubmit={(event: any) => {
                            event.preventDefault();
                            let barcodeInput = event.target[0].value;
                            getCartDataFromOrderCode(barcodeInput)
                                .then((res) => {
                                    setOrderCode(barcodeInput);
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
                            <TextField id="barcode-input" label="バーコード入力" variant="standard" fullWidth sx={{marginBottom: 1}} />
                        </Box>
                    </form>

                    <Stack direction="row" flexWrap="wrap" alignContent="flex-start" justifyContent="flex-start" sx={{overflowY: "auto"}}>
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
                        background: "white",
                        padding: "16px",
                        width: `${sideBarWidth}px`,
                        zIndex: 1,
                        boxShadow: "0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)",
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
                                enqueueSnackbar("注文をリセットしました。", { variant: "success" });
                                setOrderCode("");
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
                        <Button
                            variant="contained"
                            fullWidth
                            onClick={() => {
                                setIsSending(true);
                                sendCartData(cart, orderCode)
                                    .then((res) => {
                                        console.log(res);
                                        setOrderCode("");
                                        setCart([]);
                                        enqueueSnackbar("会計データを送信しました。", { variant: "success" });
                                        setIsSending(false);
                                    })
                                    .catch((err) => {
                                        console.log(err);
                                        enqueueSnackbar("会計データの送信に失敗しました。", { variant: "error" });
                                        setIsSending(false);
                                    });
                            }}
                            disabled={isSending}
                        >
                            {isSending ? <CircularProgress color="inherit" size={25} /> : "会計"}
                        </Button>
                        <Divider sx={{ marginBottom: 2, marginTop: 2 }} />
                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                            <Typography variant="h5" fontWeight="bold">
                                合計({cart.reduce((qty, cur) => qty + cur.quantity, 0)}点)
                            </Typography>
                            <Typography variant="h5" fontWeight="bold">
                                ¥
                                {cart
                                    .reduce((acc, cur) => acc + (menus.find((e) => e.id === cur.id)?.price ?? 0) * cur.quantity, 0)
                                    .toLocaleString()}
                            </Typography>
                        </Stack>
                    </div>
                </Stack>
            </Stack>
        </main>
    );
}
