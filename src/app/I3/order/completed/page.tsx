"use client";
import { Paper, Stack } from "@mui/material";
import { useBarcode } from "next-barcode";
import { CartMenu } from "./cartMenu";
import { CartItem, MenuItem } from "@/libs/types/item";
import * as React from "react";
import { getMenuItems } from "@/libs/apis/common/Menus";
import Typography from "@mui/material/Typography";
import Bold from "@/components/Bold";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import { getCompleteState } from "@/libs/apis/order/Completed";
import { CompleteState } from "@/libs/types/orderComplete";
import { getCompleteBarcode } from "@/libs/apis/order/Completed";

export default function Completed() {
    const [menus, setMenus] = React.useState<MenuItem[]>([]);
    const [completeStatus, setCompleteStatus] = React.useState<CompleteState>();
    const [completeBarcode, setCompleteBarcode] = React.useState<string>("");

    const { inputRef } = useBarcode({
        value: completeBarcode,
        options: {
            text: completeBarcode.split("").reduce((str, char, i) => {
                return str + char + (i % 4 === 3 ? " " : "");
            }, ""),
            fontSize: 16,
            background: "#00000000",
        },
    });

    const cart: CartItem[] = JSON.parse(localStorage.getItem("cart-item") || "[]");

    React.useEffect(() => {
        getMenuItems()
            .then((res) => {
                setMenus(res);
            })
            .catch((err) => {
                console.log(err);
            });

        getCompleteBarcode()
            .then((res) => {
                setCompleteBarcode(res);
            })
            .catch((err) => {});

        getCompleteState()
            .then((res) => {
                setCompleteStatus(res);
            })
            .catch((err) => {});
    }, []);

    return (
        <>
            <Paper
                elevation={3}
                sx={{
                    width: "100%",
                    padding: 2,
                    background: "white",
                    position: "sticky",
                    top: 0,
                    zIndex: "1201",
                    borderRadius: "0 0 8px 8px",
                }}
            >
                <Stack alignItems="center">
                    <svg ref={inputRef} />
                </Stack>
            </Paper>
            <main>
                <Card sx={{ margin: "16px auto", backgroundColor: "white" }}>
                    <CardContent>
                        <Typography variant="h5" fontWeight={"medium"}>
                            完成予定:
                        </Typography>
                        <Typography variant="h2" fontWeight={"bold"} align="center">
                            10:20
                        </Typography>
                        <Typography variant="h6" fontWeight={"medium"} align="center">
                            完成状況:{" "}
                            <Bold>
                                {completeStatus?.state === "Cooking"
                                    ? "調理中"
                                    : completeStatus?.state === "Cooked"
                                    ? "完成"
                                    : "受け取り済み"}
                            </Bold>
                        </Typography>
                    </CardContent>
                </Card>
                <Stack direction="row" justifyContent="space-between" alignItems="baseline" sx={{ margin: "8px" }}>
                    <Typography variant="h4">合計</Typography>
                    <Typography variant="h3">
                        ¥{cart.reduce((p, c) => p + (menus.find((e) => e.id === c.id)?.price || 0) * c.quantity, 0).toLocaleString()}
                    </Typography>
                </Stack>

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
                {cart.map((e, i) => (
                    <CartMenu cart={e} menus={menus} key={i} />
                ))}
            </main>
        </>
    );
}
