/** @jsxImportSource @emotion/react */
"use client";

import { css } from "@emotion/react";
import Bold from "@/components/Bold";
import { getMenuItems } from "@/libs/apis/common/Menus";
import { CartItem, MenuItem } from "@/libs/types/item";
import Backdrop from "@mui/material/Backdrop";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { execSync } from "child_process";
import * as React from "react";
import { CartMenu } from "./cartMenu";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import { CardContent, Paper } from "@mui/material";
import { sendCartData } from "@/libs/apis/order/Carts";
import { useRouter } from "next/navigation";

export default function Confirm() {
    const [menus, setMenus] = React.useState<MenuItem[]>([]);
    const [isSending, setIsSending] = React.useState<boolean>(false);
    let cart: CartItem[] = JSON.parse(localStorage.getItem("cart-item") || "[]");

    const router = useRouter();

    React.useEffect(() => {
        getMenuItems()
            .then((res) => {
                setMenus(res);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    function onConfirm() {
        setIsSending(true);
        sendCartData(cart)
            .then(() => {
                router.push("/I3/order/completed");
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setIsSending(false);
            });
    }

    if (menus.length <= 0 || isSending) {
        return (
            <main>
                <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={true}>
                    <CircularProgress color="inherit" />
                </Backdrop>
            </main>
        );
    }

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

            {cart.map((e, i) => (
                <CartMenu cart={e} menus={menus} key={i} />
            ))}

            <Stack direction="row" justifyContent="space-between" alignItems="baseline" sx={{ margin: "8px" }}>
                <Typography variant="h4">合計</Typography>
                <Typography variant="h3">
                    ¥{cart.reduce((p, c) => p + (menus.find((e) => e.id === c.id)?.price || 0) * c.quantity, 0).toLocaleString()}
                </Typography>
            </Stack>
            <Divider sx={{ marginBottom: "16px" }} />

            <Stack direction="column">
                <Card sx={{ background: "white", marginY: "8px" }}>
                    <CardContent>
                        <Typography variant="body1">2本以上購入で1回抽選！</Typography>
                        <Button
                            size="large"
                            variant="contained"
                            color="inherit"
                            sx={{
                                background:
                                    "linear-gradient(38deg, rgba(255,0,254,1) 20%, rgba(165,62,255,1) 48%, rgba(0,116,255,1) 89%) !important;",
                                marginTop: "8px",
                            }}
                            fullWidth
                        >
                            <Typography variant="body1" sx={{ color: "white" }}>
                                <Bold>くじを引く</Bold>
                            </Typography>
                        </Button>
                    </CardContent>
                </Card>

                <Card sx={{ background: "white", marginY: "8px" }}>
                    <CardContent>
                        <Typography variant="body1">QRコードを友達に読み込んでもらって1回抽選！</Typography>
                        {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text */}
                        <img
                            src="/img/sample_code.jpeg"
                            css={css`
                                width: -webkit-fill-available;
                            `}
                        />
                        <Button
                            size="large"
                            variant="contained"
                            color="inherit"
                            sx={{
                                background:
                                    "linear-gradient(38deg, rgba(255,0,254,1) 20%, rgba(165,62,255,1) 48%, rgba(0,116,255,1) 89%) !important;",
                                marginTTop: "8px",
                            }}
                            fullWidth
                        >
                            <Typography variant="body1" sx={{ color: "white" }}>
                                <Bold>くじを引く</Bold>
                            </Typography>
                        </Button>
                    </CardContent>
                </Card>
            </Stack>

            <Stack direction="row" justifyContent="space-between">
                <Button variant="contained" color="inherit" href="/I3/order/menus" size="large">
                    戻る
                </Button>
                <Button variant="contained" onClick={onConfirm} size="large">
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
