"use client";
import { Backdrop, CircularProgress, Paper, Stack } from "@mui/material";
import { CartMenu } from "./cartMenu";
import { MenuItem } from "@/libs/types/item";
import * as React from "react";
import { getMenuItems } from "@/libs/apis/common/Menus";
import Typography from "@mui/material/Typography";
import Bold from "@/components/Bold";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

import { getCompleteInfo, getCompleteState } from "@/libs/apis/order/Completed";
import { CompleteInfo, CompleteState } from "@/libs/types/orderComplete";
import { enqueueSnackbar } from "notistack";
import Barcode from "react-barcode";

export default function Completed() {
    const [menus, setMenus] = React.useState<MenuItem[]>([]);
    const [completeStatus, setCompleteStatus] = React.useState<CompleteState>();
    const [completeInfo, setCompleteInfo] = React.useState<CompleteInfo>();

    React.useEffect(() => {
        getMenuItems()
            .then((res) => {
                if (res.hasOwnProperty("message")) {
                    enqueueSnackbar((res as any).message, { variant: "error" });
                    return;
                }
                setMenus(res);
            })
            .catch((err) => {
                enqueueSnackbar(err, { variant: "error" });
            });

        getCompleteInfo()
            .then((res) => {
                if (res.hasOwnProperty("message")) {
                    enqueueSnackbar((res as any).message, { variant: "error" });
                    return;
                }
                setCompleteInfo(res);
            })
            .catch((err) => {
                enqueueSnackbar(err, { variant: "error" });
            });
    }, []);

    React.useEffect(() => {
        let timeoutId: NodeJS.Timeout;
        function update() {
            getCompleteState()
                .then((res) => {
                    if (res.hasOwnProperty("message")) {
                        enqueueSnackbar((res as any).message, { variant: "error" });
                        return;
                    }
                    setCompleteStatus(res);
                })
                .catch((err) => {
                    enqueueSnackbar(err, { variant: "error" });
                });
            timeoutId = setTimeout(update, 10000);
        }
        update();

        return () => {
            clearTimeout(timeoutId);
        };
    }, []);

    if (completeInfo === undefined || menus.length <= 0) {
        return (
            <main>
                <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={true}>
                    <CircularProgress color="inherit" />
                </Backdrop>
            </main>
        );
    }

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
                    <Barcode value={completeInfo?.barcode || ""} />
                </Stack>
            </Paper>
            <main>
                <Card sx={{ margin: "16px auto", backgroundColor: "white" }}>
                    <CardContent>
                        <Typography variant="h5" fontWeight={"medium"}>
                            完成予定:
                        </Typography>
                        <Typography variant="h2" fontWeight={"bold"} align="center">
                            {new Date(completeInfo?.completeTime || "0").getHours() +
                                ":" +
                                new Date(completeInfo?.completeTime || "0").getMinutes()}
                        </Typography>
                        <Typography variant="h6" fontWeight={"medium"} align="center">
                            完成状況:{" "}
                            <Bold>
                                {completeStatus?.state === "Cooking"
                                    ? "調理中"
                                    : completeStatus?.state === "Cooked"
                                    ? "完成"
                                    : completeStatus?.state === "Delivered"
                                    ? "受け取り済み"
                                    : "不明"}
                            </Bold>
                        </Typography>
                    </CardContent>
                </Card>
                <Stack direction="row" justifyContent="space-between" alignItems="baseline" sx={{ margin: "8px" }}>
                    <Typography variant="h4">合計</Typography>
                    <Typography variant="h3">
                        ¥
                        {completeInfo?.items
                            .reduce((p, c) => p + (menus.find((e) => e.id === c.id)?.price || 0) * c.quantity, 0)
                            .toLocaleString()}
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
                {completeInfo?.items.map((e, i) => (
                    <CartMenu cart={e} menus={menus} key={i} />
                ))}
            </main>
        </>
    );
}
