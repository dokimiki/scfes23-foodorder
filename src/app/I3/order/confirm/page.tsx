/** @jsxImportSource @emotion/react */
"use client";

import { css } from "@emotion/react";
import Bold from "@/components/Bold";
import { getMenuItems } from "@/libs/apis/Menus";
import { CartItem, MenuItem } from "@/libs/types/item";
import Backdrop from "@mui/material/Backdrop";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { execSync } from "child_process";
import * as React from "react";
import { cartMenu } from "./cartMenu";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import { CardContent } from "@mui/material";

export default function Confirm() {
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
                return cartMenu(menus, e);
            })}

            <Stack direction="row" justifyContent="space-between" alignItems="baseline" sx={{ margin: "8px" }}>
                <Typography variant="h4">合計</Typography>
                <Typography variant="h3">
                    ¥{cart.reduce((p, c) => p + (menus.find((e) => e.id === c.id)?.price || 0) * c.quantity, 0).toLocaleString()}
                </Typography>
            </Stack>
            <Divider sx={{ marginBottom: "16px" }} />

            <div
                css={css`
                    color: white;
                    width: 100%;
                `}
            >
                <Card sx={{ margin: "0 auto", backgroundColor: "white" }}>
                    <CardContent>
                        <Typography variant="h5">2本以上購入!!</Typography>
                        <Button
                            size="large"
                            variant="contained"
                            color="inherit"
                            sx={{
                                background:
                                    "linear-gradient(38deg, rgba(255,0,254,1) 20%, rgba(165,62,255,1) 48%, rgba(0,116,255,1) 89%) !important;",
                            }}
                        >
                            <Typography variant="h6">くじを引く</Typography>
                        </Button>
                    </CardContent>
                </Card>

                <Card sx={{ margin: "10px auto", padding: " 0 auto", backgroundColor: "white" }}>
                    <CardContent>
                        <Typography width={"200px"}>
                            {""}
                            <img src="/img/sample_code.jpeg" alt="qrコード" />
                        </Typography>
                        <Button
                            size="large"
                            variant="contained"
                            color="inherit"
                            sx={{
                                background:
                                    "linear-gradient(38deg, rgba(255,0,254,1) 20%, rgba(165,62,255,1) 48%, rgba(0,116,255,1) 89%) !important;",
                            }}
                        >
                            <Typography variant="h6">くじを引く</Typography>
                        </Button>
                    </CardContent>
                </Card>
            </div>

            <Stack direction="row" justifyContent="space-between">
                <Button variant="contained" color="inherit" href="/I3/order/menus" size="large">
                    戻る
                </Button>
                <Button variant="contained" href="/I3/order/completed" size="large">
                    注文を確定する
                </Button>
            </Stack>
            <Typography variant="body2" sx={{ marginTop: "8px" }}>
                ※注文を確定すると、キャンセル・変更をスマホ上から行うことはできません。
                <br />
                もしも注文をキャンセル・変更したい場合は、店員にお声がけください。
            </Typography>
        </main>
    );
}
