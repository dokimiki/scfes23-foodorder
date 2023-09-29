"use client";
import { getMenuItems } from "@/libs/apis/common/Menus";
import { MenuItem } from "@/libs/types/item";
import { Order } from "@/libs/types/order";
import AppBar from "@mui/material/AppBar";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import React from "react";
import SeasoningPaper from "./SeasoningPaper";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { getSeasoningData } from "@/libs/apis/admin/Orders";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { enqueueSnackbar } from "notistack";
import { finishedSeasoning } from "@/libs/apis/admin/Seasoning";

export default function Page() {
    const [open, setOpen] = React.useState(false);
    const [dialogOrderId, setDialogOrderId] = React.useState("");

    const [menus, setMenus] = React.useState<MenuItem[]>([]);
    const [orders, setOrders] = React.useState<Order[]>([]);

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
    }, []);

    React.useEffect(() => {
        let timeoutId: NodeJS.Timeout;
        function update() {
            getSeasoningData()
                .then((res) => {
                    if (res.hasOwnProperty("message")) {
                        enqueueSnackbar((res as any).message, { variant: "error" });
                        return;
                    }
                    setOrders(res);
                })
                .catch((err) => {
                    enqueueSnackbar(err, { variant: "error" });
                });
            timeoutId = setTimeout(update, 5000);
        }
        update();

        return () => {
            clearTimeout(timeoutId);
        };
    }, []);

    function handleDialogClose() {
        setOpen(false);
    }

    function handleDialogOpen(orderId: string) {
        setDialogOrderId(orderId);
        setOpen(true);
    }

    if (menus.length <= 0 || orders.length <= 0) {
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
            <AppBar position="fixed">
                <Toolbar>
                    <Typography variant="h4" align="center" sx={{ flexGrow: 1 }}>
                        シーズニング
                    </Typography>
                </Toolbar>
            </AppBar>
            <Toolbar />

            <Stack>
                {orders.map((e, i) => {
                    return <SeasoningPaper order={e} menus={menus} onOpenModal={() => handleDialogOpen(e.id)} key={i} />;
                })}
            </Stack>
            <Dialog open={open} onClose={handleDialogClose} keepMounted>
                <DialogTitle id="alert-dialog-title">この注文は提供済みですか？</DialogTitle>
                <DialogContent>
                    <Stack alignItems="center">
                        <Typography variant="h6">番号札</Typography>
                        <Typography variant="h3" color={"#ffa53f"}>
                            {orders.find((e) => e.id === dialogOrderId)?.numberTag}
                        </Typography>
                    </Stack>
                </DialogContent>

                <DialogActions>
                    <Stack direction="row" justifyContent="space-between" width="100%">
                        <Button onClick={handleDialogClose} variant="contained" size="large" color="inherit">
                            キャンセル
                        </Button>
                        <Button
                            onClick={() => {
                                handleDialogClose();
                                finishedSeasoning(dialogOrderId)
                                    .then((res) => {
                                        if (res.hasOwnProperty("message")) {
                                            enqueueSnackbar((res as any).message, { variant: "error" });
                                            return;
                                        }
                                    })
                                    .catch((err) => {
                                        enqueueSnackbar(err, { variant: "error" });
                                    });

                                getSeasoningData()
                                    .then((res) => {
                                        if (res.hasOwnProperty("message")) {
                                            enqueueSnackbar((res as any).message, { variant: "error" });
                                            return;
                                        }
                                        setOrders(res);
                                    })
                                    .catch((err) => {
                                        enqueueSnackbar(err, { variant: "error" });
                                    });
                            }}
                            variant="contained"
                            size="large"
                            autoFocus
                        >
                            完了
                        </Button>
                    </Stack>
                </DialogActions>
            </Dialog>
        </main>
    );
}
