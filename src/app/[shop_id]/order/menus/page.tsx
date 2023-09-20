"use client";
import { MAX_CART_ITEM_QUANTITY, MIN_CART_ITEM_QUANTITY } from "@/libs/Carts";
import { getMenuItems } from "@/libs/Items";
import { CartItem, MenuItem } from "@/libs/types/item";
import { Global, css } from "@emotion/react";
import Typography from "@mui/material/Typography";
import * as React from "react";
import AllAllergen from "./allergen";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import OrderDrawerContent from "./drawer";
import style from "./style.module.scss";
import MenuItemPaper from "./menuItemPaper";
import { allergensList } from "@/libs/types/allergen";
import { Map } from "@mui/icons-material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";

const drawerBleeding = 68.5;

export default function Menus() {
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
                alert((menus.find((e) => e.id === newCart[index].id)?.name ?? "なぞ") + "をカートから削除しました。");
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
            <div>
                <Typography
                    variant="h2"
                    sx={{
                        fontSize: "2rem",
                    }}
                >
                    小林トルネードとは？
                </Typography>
                <Typography variant="body1">味の種類豊富なトルネードポテト！うまい！</Typography>
            </div>

            <div>
                <Typography
                    variant="h2"
                    sx={{
                        fontSize: "2rem",
                    }}
                >
                    味を選択してください！
                </Typography>
                <List
                    sx={{
                        width: "100%",
                        maxWidth: 360,
                        bgcolor: "background.paper",
                        margin: "0 auto",
                    }}
                 >
                    {menus.map((e, i) => {
                        return <MenuItemPaper name={e.name} price={e.price} key={i} />;
                    })}
                </List>
            </div>

            <Typography variant="h5">アレルゲン情報</Typography>
            <AllAllergen
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
            />

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
                {menus === undefined ? (
                    <></>
                ) : (
                    <OrderDrawerContent
                        menus={menus}
                        cart={cart}
                        addToCart={addToCart}
                        removeFromCart={removeFromCart}
                        drawerBleeding={drawerBleeding}
                    />
                )}
            </SwipeableDrawer>
        </main>
    );
}

/* ---------------------- ドロワー ----------------------*/
