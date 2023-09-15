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
    ] as CartItem[]);
    const [open, setOpen] = React.useState(false);

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };

    return (
        <main
            css={css`
                margin-bottom: calc(${drawerBleeding}px + 1em);
                padding: 0 20px;
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
                <h2>小林トルネードとは？</h2>
                <p>味の種類豊富なトルネードポテト！うまい！</p>
            </div>

            <hr />
            <div className={style.menu}>
                <h2>味を選択してください！</h2>
                <div className={style.menu_list}></div>
            </div>
            <hr />
            <Typography variant="h5">アレルゲン</Typography>
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
                <OrderDrawerContent cart={cart} />
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

function OrderDrawerContent({ cart }: { cart: CartItem[] }) {
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
                        <Typography variant="h4">
                            {cart.reduce((amount, e) => {
                                return amount + (menus.find((menu) => menu.id === e.id)?.price ?? 0) * e.quantity;
                            }, 0)}
                        </Typography>
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
                <Skeleton variant="rectangular" height="100%" />
            </Box>
        </>
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
