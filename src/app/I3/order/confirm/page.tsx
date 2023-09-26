"use client";
import Bold from "@/components/Bold";
import { getMenuItems } from "@/libs/apis/Menus";
import { CartItem, MenuItem } from "@/libs/types/item";
import Avatar from "@mui/material/Avatar";
import Backdrop from "@mui/material/Backdrop";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/navigation";
import * as React from "react";

export default function Confirm() {
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

    if (menus.length <= 0) {
        return (
            <main>
                <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={true}>
                    <CircularProgress color="inherit" />
                </Backdrop>
            </main>
        );
    }

    const cart: CartItem[] = JSON.parse(localStorage.getItem("cart-item") || "[]");
    return (
        <main>
            <Typography
                variant="h2"
                sx={{
                    fontSize: "2rem",
                }}
            >
                <Bold>注文確認</Bold>
            </Typography>

            {cart.map((e, i) => {
                const menu: MenuItem = menus.find((m) => m.id === e.id) || { id: "", name: "", price: 0, image: "" };
                return (
                    <div key={i}>
                        <Stack
                            direction="row"
                            justifyContent="space-between"
                            alignItems="center"
                            sx={{
                                marginY: "0.5rem",
                            }}
                        >
                            <Stack direction="row" alignItems="center" justifyContent="space-between" width="inherit">
                                <Stack direction="row" spacing={1} alignItems="center">
                                    <Avatar src={menu.image} sx={{ width: "4.3rem", height: "4.3rem" }} />
                                    <Stack>
                                        <Typography variant="body1">{menu.name}</Typography>
                                        <Typography variant="h6">{menu.price}円</Typography>
                                    </Stack>
                                </Stack>

                                <Typography variant="h6" sx={{ marginRight: "8px" }}>
                                    ✕ {e.quantity}
                                </Typography>
                            </Stack>

                            <Typography variant="h5" width="8rem" align="right">
                                {(menu.price * e.quantity).toLocaleString()}¥
                            </Typography>
                        </Stack>
                        <Divider />
                    </div>
                );
            })}

            <Stack direction="row" justifyContent="space-between" alignItems="baseline" sx={{ margin: "8px" }}>
                <Typography variant="h4">合計</Typography>
                <Typography variant="h3">
                    {cart.reduce((p, c) => p + (menus.find((e) => e.id === c.id)?.price || 0) * c.quantity, 0).toLocaleString()}円
                </Typography>
            </Stack>
            <Divider sx={{ marginBottom: "16px" }} />

            <Stack direction="row">
                <Button
                    variant="contained"
                    color="inherit"
                    onClick={() => {
                        router.push("/I3/order/menus");
                    }}
                    size="large"
                >
                    戻る
                </Button>
                <Button
                    variant="contained"
                    onClick={() => {
                        router.push("/I3/order/completed");
                    }}
                    size="large"
                >
                    注文を確定する
                </Button>
            </Stack>
        </main>
    );
}
