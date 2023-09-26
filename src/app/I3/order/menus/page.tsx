/** @jsxImportSource @emotion/react */
"use client";
import { MAX_CART_ITEM_QUANTITY, MIN_CART_ITEM_QUANTITY } from "@/libs/Carts";
import { getMenuItems } from "@/libs/Items";
import { CartItem, MenuItem } from "@/libs/types/item";
import { Global, css } from "@emotion/react";
import Typography from "@mui/material/Typography";
import * as React from "react";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import OrderDrawerContent from "./OrderDrawerContent";
import MenuItemPaper from "./MenuItemPaper";
import { allergensList } from "@/libs/types/allergen";
import List from "@mui/material/List";
import { Backdrop, Button, CircularProgress, Dialog, Divider, Stack } from "@mui/material";
import AllergenDialogContent from "./AllergenDialogContent";
import { useRouter } from "next/navigation";

const drawerBleeding = 68.5;

function Bold({ children }: { children: React.ReactNode }) {
    return (
        <span
            css={css`
                font-weight: bold;
            `}
        >
            {children}
        </span>
    );
}

export default function Menus() {
    const router = useRouter();
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

    const [cart, setCart] = React.useState<CartItem[]>([]);
    const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
    const [isDialogOpen, setIsDialogOpen] = React.useState(false);
    const [selectedModalItemID, SelectModalItemID] = React.useState("");

    React.useEffect(() => {
        setCart(JSON.parse(localStorage.getItem("cart-item") || "[]"));
    }, []);

    function setLocalStorageCart(cart: CartItem[]) {
        localStorage.setItem("cart-item", JSON.stringify(cart.filter((e) => e.quantity > 0)));
    }

    function addToCart(id: string) {
        const index = cart.findIndex((e) => e.id === id);
        if (index === -1) {
            setCart([...cart, { id: id, quantity: 1 }]);
            setLocalStorageCart([...cart, { id: id, quantity: 1 }]);
        } else {
            const newCart = cart.slice();
            newCart[index].quantity++;
            newCart[index].quantity = Math.min(newCart[index].quantity, MAX_CART_ITEM_QUANTITY);
            setCart(newCart);
            setLocalStorageCart(newCart);
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
                alert((menus.find((e) => e.id === newCart[index].id)?.name ?? "なぞ") + "をカートから削除しました。");
                newCart.splice(index, 1);
            }
            setCart(newCart);
            setLocalStorageCart(newCart);
        }
    }

    function sendCartData() {
        router.push("/I3/order/confirm");
    }

    const toggleDrawer = (newOpen: boolean) => () => {
        setIsDrawerOpen(newOpen);
    };

    if (menus.length <= 0) {
        return (
            <main>
                <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={true}>
                    <CircularProgress color="inherit" />
                </Backdrop>
            </main>
        );
    }

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
            <div>
                <Typography
                    variant="h2"
                    sx={{
                        fontSize: "2rem",
                    }}
                >
                    <Bold>トルネードポテト小林</Bold>
                </Typography>
                <Typography variant="body1">
                    I3のトルネードポテト・ネット支店へようこそ！
                    <br />
                    予約してくれた人の中から抽選で割引もあるよ！
                    <br /> このサイトで注文をして、お得に待ち時間なしでポテトを受け取ろう！
                    <br />
                    <br />
                    使い方は簡単！
                    <br />
                </Typography>
                <ol
                    css={css`
                        margin: 0;
                        padding-inline: 1rem;
                    `}
                >
                    <li>
                        下のメニューから<Bold>好きな味</Bold>を選ぼう！
                    </li>
                    <li>
                        <Bold>「注文する」</Bold>ボタンを押そう！
                    </li>
                    <li>
                        注文の<Bold>確認・送信</Bold>をしよう！
                    </li>
                    <li>
                        金券とこのアプリをもって、<Bold>ポテト</Bold>を受け取りに来よう！
                    </li>
                    <li>
                        <Bold>おいしく</Bold>食べよう！
                    </li>
                </ol>
            </div>

            <Divider sx={{ margin: "20px 0" }} />

            <div>
                <Typography
                    variant="h2"
                    sx={{
                        fontSize: "2rem",
                    }}
                >
                    好きな味をえらぼう！
                </Typography>
                <List
                    sx={{
                        width: "100%",
                        bgcolor: "background.paper",
                        margin: "0 auto",
                    }}
                >
                    {menus.map((menu, i) => {
                        return (
                            <MenuItemPaper
                                menu={menu}
                                onClickAddToCart={() => {
                                    addToCart(menu.id);
                                }}
                                openModal={() => {
                                    setIsDialogOpen(true);
                                    SelectModalItemID(menu.id);
                                }}
                                key={i}
                            />
                        );
                    })}
                </List>
            </div>

            <Stack sx={{ marginY: 2 }}>
                <Button variant="contained" color="inherit" onClick={toggleDrawer(true)}>
                    カートを開く
                </Button>
            </Stack>

            <Dialog
                onClose={() => {
                    setIsDialogOpen(false);
                }}
                open={isDialogOpen}
            >
                <AllergenDialogContent
                    allergens={
                        {
                            ebi: "NotContains",
                            kani: "Contains",
                            komugi: "NotContains",
                            kurumi: "NotContains",
                            milk: "NotContains",
                            peanut: "Contamination",
                            soba: "NotContains",
                            tamago: "NotContains",
                        } as allergensList
                    }
                    itemInfo={menus.find((e) => e.id === selectedModalItemID)}
                    onClose={() => {
                        setIsDialogOpen(false);
                    }}
                />
            </Dialog>

            <SwipeableDrawer
                anchor="bottom"
                open={isDrawerOpen}
                onClose={toggleDrawer(false)}
                onOpen={toggleDrawer(true)}
                swipeAreaWidth={drawerBleeding}
                disableSwipeToOpen={false}
                ModalProps={{
                    keepMounted: true,
                }}
            >
                <OrderDrawerContent
                    menus={menus}
                    cart={cart}
                    addToCart={addToCart}
                    removeFromCart={removeFromCart}
                    onOrder={() => {
                        sendCartData();
                    }}
                    drawerBleeding={drawerBleeding}
                />
            </SwipeableDrawer>
        </main>
    );
}
