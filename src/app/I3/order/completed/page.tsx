"use client";
import { Paper, Stack } from "@mui/material";
import { useBarcode } from "next-barcode";
import { cartMenu } from "../confirm/cartMenu";
import { CartItem, MenuItem } from "@/libs/types/item";
import * as React from "react";
import { getMenuItems } from "@/libs/apis/Menus";
import Typography from "@mui/material/Typography";
import Bold from "@/components/Bold";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";

export default function Completed() {
    const barcode = Array.from({ length: 24 }, () => Math.floor(Math.random() * 10)).join("");
    const { inputRef } = useBarcode({
        value: barcode,
        options: {
            text: barcode.split("").reduce((str, char, i) => {
                return str + char + (i % 4 === 3 ? " " : "");
            }, ""),
            fontSize: 16,
            background: "#00000000",
        },
    });
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
    const cart: CartItem[] = JSON.parse(localStorage.getItem("cart-item") || "[]");

    return (
        <>
            <div>
                <Paper
                    elevation={3}
                    sx={{
                        width: "100%",
                        padding: 2,
                        background: "white",
                        position: "relative",
                        zIndex: "1201",
                        borderRadius: "0 0 8px 8px",
                    }}
                >
                    <Stack alignItems="center">
                        <svg ref={inputRef} />
                    </Stack>
                </Paper>
            </div>
            <main>
                <Card sx={{ margin: "50px auto", width: "250px", backgroundColor: "white" }}>
                    <CardContent>
                        <Typography variant="h5" fontWeight={"medium"}>
                            待ち時間:
                        </Typography>
                        <Typography variant="h2" fontWeight={"bold"}>
                            約10分
                        </Typography>
                    </CardContent>
                </Card>

                <Typography
                    variant="h2"
                    sx={{
                        marginBottom: "8px",
                        paddingBottom: "8px",
                        fontSize: "2rem",
                        borderBottom: "2px solid",
                        borderColor: "#696969",
                        width: "200px",
                    }}
                >
                    <Bold>注文内容</Bold>
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
            </main>
        </>
    );
}
