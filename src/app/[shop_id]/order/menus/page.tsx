"use client";
// メニュー一覧ページ
import * as React from "react";
import { css } from "@emotion/react";
import { Global } from "@emotion/react";
import { styled } from "@mui/material/styles";
import { grey } from "@mui/material/colors";
import style from "./style.module.scss";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Badge from "@mui/material/Badge";
import Stack from "@mui/material/Stack";
import Image from "next/image";

import { CartItem, MenuItem } from "@/libs/types/item";
import { getMenuItems } from "@/libs/Items";
import { Divider, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import Stepper from "@/components/Stepper";
import { MAX_CART_ITEM_QUANTITY, MIN_CART_ITEM_QUANTITY } from "@/libs/Carts";

let menus: MenuItem[];

export default function Menus() {
    getMenuItems()
        .then((res) => {
            menus = res;
        })
        .catch((err) => {
            console.log(err);
        });

    const [cart, setCart] = React.useState([
        { id: "1", quantity: 1 },
        { id: "2", quantity: 2 },
        { id: "3", quantity: 3 },
        { id: "4", quantity: 2 },
    ] as CartItem[]);
    const [open, setOpen] = React.useState(false);

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

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };

    return (
        <main
            css={css`
                margin-bottom: calc(${drawerBleeding}px);
            `}
        >
            <Global
                styles={{
                    ".MuiDrawer-root > .MuiPaper-root": {
                        height: `calc(50% - ${drawerBleeding}px)`,
                        overflow: "visible",
                    },
                }}
            />
            <div className={style.top}>
                <Typography variant="h2">小林トルネードとは？</Typography>
                <Typography variant="body1">味の種類豊富なトルネードポテト！うまい！</Typography>
            </div>

            <div className={style.menu}>
                <h2>味を選択してください！</h2>
                <div className={style.menu_list}></div>
            </div>
            <Divider />
            <Typography variant="h5">アレルゲン</Typography>
            <AllAllergen />

            <SwipeableDrawer
                anchor="bottom"
                open={open}
                onClose={toggleDrawer(false)}
                onOpen={toggleDrawer(true)}
                swipeAreaWidth={drawerBleeding}
                disableSwipeToOpen={false}
                ModalProps={{
                    keepMounted: true,
                }}
            >
                <OrderDrawerContent cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} />
            </SwipeableDrawer>
        </main>
    );
}

/* ---------------------- ドロワー ----------------------*/

const drawerBleeding = 68.5;

const Puller = styled(Box)(({ theme }) => ({
    width: 30,
    height: 6,
    backgroundColor: theme.palette.mode === "light" ? grey[300] : grey[900],
    borderRadius: 3,
    position: "absolute",
    top: 8,
    left: "calc(50% - 15px)",
}));

function OrderDrawerContent({
    cart,
    addToCart,
    removeFromCart,
}: {
    cart: CartItem[];
    addToCart: (id: string) => void;
    removeFromCart: (id: string) => void;
}) {
    let total = cart.reduce((amount, e) => {
        return amount + (menus.find((menu) => menu.id === e.id)?.price ?? 0) * e.quantity;
    }, 0);
    return (
        <>
            <Box
                sx={{
                    background: "#fff",
                    position: "absolute",
                    top: -drawerBleeding,
                    borderTopLeftRadius: 8,
                    borderTopRightRadius: 8,
                    visibility: "visible",
                    right: 0,
                    left: 0,
                }}
            >
                <Puller />
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Stack direction="row" alignItems="baseline" sx={{ marginLeft: 2 }}>
                        <Badge
                            badgeContent={cart.reduce((quantity, e) => {
                                return quantity + e.quantity;
                            }, 0)}
                            color="error"
                            sx={{ marginRight: 2 }}
                        >
                            <ShoppingCartIcon sx={{ marginBottom: "0.2em" }} />
                        </Badge>
                        <Typography variant="h6" sx={{ color: "text.secondary" }}>
                            ￥
                        </Typography>
                        <Typography variant="h4">{total.toLocaleString()}</Typography>
                    </Stack>
                    <Button variant="contained" sx={{ margin: 2, pointerEvents: "all" }}>
                        注文する
                    </Button>
                </Stack>
            </Box>
            <Box
                sx={{
                    px: 2,
                    pb: 2,
                    height: "100%",
                    overflow: "auto",
                    background: "#fff",
                }}
            >
                <CartItemTable cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} total={total} />
            </Box>
        </>
    );
}

function CartItemTable({
    cart,
    addToCart,
    removeFromCart,
    total,
}: {
    cart: CartItem[];
    addToCart: (id: string) => void;
    removeFromCart: (id: string) => void;
    total: number;
}) {
    return (
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell align="center" sx={{ minWidth: "30vw" }}>
                            商品
                        </TableCell>
                        <TableCell align="center" sx={{ minWidth: "100px" }}>
                            個数
                        </TableCell>
                        <TableCell align="right" sx={{ minWidth: "6rem" }}>
                            金額
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <Global
                        styles={{
                            ".cart-item-table-row-hidden": {
                                display: "none !important",
                            },
                        }}
                    />
                    {React.useMemo(
                        () =>
                            menus.map((e, i) => {
                                const cartData = cart.find((cartItem) => cartItem.id === e.id);
                                return (
                                    <TableRow key={i} className={(cartData?.quantity ?? 0) > 0 ? "" : " cart-item-table-row-hidden"}>
                                        <TableCell align="center">{e.name}</TableCell>
                                        <TableCell align="center">
                                            <span
                                                css={css`
                                                    margin: 0 auto;
                                                    display: inline-table;
                                                `}
                                            >
                                                <Stepper
                                                    num={cartData?.quantity ?? 0}
                                                    size="small"
                                                    onClickAdd={() => addToCart(e.id)}
                                                    onClickRemove={() => removeFromCart(e.id)}
                                                />
                                            </span>
                                        </TableCell>
                                        <TableCell align="right">¥&nbsp;{(e.price * (cartData?.quantity ?? 0)).toLocaleString()}</TableCell>
                                    </TableRow>
                                );
                            }),
                        [cart, addToCart, removeFromCart]
                    )}
                    <TableRow>
                        <TableCell rowSpan={3} />
                        <TableCell align="right">
                            <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                                カート合計:
                            </Typography>
                        </TableCell>
                        <TableCell align="right">
                            <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                                ¥&nbsp;{total.toLocaleString()}
                            </Typography>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
}

/* ---------------------- アレルゲン ----------------------*/
const allergenColor = {
    Contains: "#ff6347",
    Contamination: "#ffd700",
    NotContains: "white",
};

function Allergen({
    allergenName,
    imgSrc,
    ContaminationStatus,
}: {
    allergenName: string;
    imgSrc: string;
    ContaminationStatus: "Contains" | "NotContains" | "Contamination";
}) {
    const bgColor = allergenColor[ContaminationStatus];
    return (
        <Stack
            direction="row"
            alignItems="center"
            sx={{
                background: bgColor,
                borderRadius: 2,
                padding: "2px",
                minWidth: "130px",
                margin: 1,
            }}
            spacing={1}
        >
            <Image src={imgSrc} alt={allergenName} width={50} height={50} />
            <Typography variant="h6">{allergenName}</Typography>
        </Stack>
    );
}

function AllAllergen() {
    return (
        <>
            <Stack
                spacing={1}
                sx={{ margin: 2 }}
                css={css`
                    > * {
                        border-radius: 4px;
                        padding: 0 0.5em;
                    }
                `}
            >
                <Typography variant="h6" sx={{ background: allergenColor["NotContains"] }}>
                    白：ふくまれていない
                </Typography>
                <Typography variant="h6" sx={{ background: allergenColor["Contamination"] }}>
                    黄色：調理工程で触れている
                </Typography>
                <Typography variant="h6" sx={{ background: allergenColor["Contains"] }}>
                    赤：含まれている
                </Typography>
            </Stack>
            <Stack direction="row" sx={{ margin: 2 }} flexWrap="wrap" justifyContent="space-around">
                <Allergen allergenName="えび" imgSrc="/img/allergen_ebi.png" ContaminationStatus="Contains" />
                <Allergen allergenName="かに" imgSrc="/img/allergen_kani.png" ContaminationStatus="NotContains" />
                <Allergen allergenName="小麦" imgSrc="/img/allergen_komugi.png" ContaminationStatus="Contamination" />
                <Allergen allergenName="そば" imgSrc="/img/allergen_soba.png" ContaminationStatus="NotContains" />
                <Allergen allergenName="卵" imgSrc="/img/allergen_tamago.png" ContaminationStatus="Contains" />
                <Allergen allergenName="ミルク" imgSrc="/img/allergen_milk.png" ContaminationStatus="NotContains" />
                <Allergen allergenName="落花生" imgSrc="/img/allergen_peanuts.png" ContaminationStatus="NotContains" />
                <Allergen allergenName="クルミ" imgSrc="/img/allergen_kurumi.png" ContaminationStatus="NotContains" />
            </Stack>
        </>
    );
}
