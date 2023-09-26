"use client";
import { getMenuItems } from "@/libs/apis/Menus";
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

function getOrderedCarts(): Order[] {
    return [
        {
            id: "1",
            isMobileOrder: false,
            numberTag: 15,
            items: [
                {
                    id: "1",
                    quantity: 2,
                },
                {
                    id: "2",
                    quantity: 1,
                },
                {
                    id: "3",
                    quantity: 4,
                },
            ],
        },
        {
            id: "2",
            isMobileOrder: true,
            numberTag: 0,
            items: [
                {
                    id: "4",
                    quantity: 2,
                },
            ],
        },
    ];
}

export default function Page() {
    const [open, setOpen] = React.useState(false);
    const [dialogOrderId, setDialogOrderId] = React.useState(0);

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

    function handleDialogClose() {
        setOpen(false);
    }

    function handleDialogOpen(orderNumber: number) {
        setOpen(true);
        setDialogOrderId(orderNumber);
    }

    const orders: Order[] = getOrderedCarts();

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
                {orders.map((e, i) => (
                    <SeasoningPaper order={e} menus={menus} onOpenModal={() => handleDialogOpen(e.numberTag)} key={i} />
                ))}
            </Stack>
            <Dialog open={open} onClose={handleDialogClose} keepMounted>
                <DialogTitle id="alert-dialog-title">この注文は提供済みですか？</DialogTitle>
                <DialogContent>
                    <Stack alignItems="center">
                        <Typography variant="h6">番号札</Typography>
                        <Typography variant="h3" color={"#ffa53f"}>
                            {dialogOrderId}
                        </Typography>
                    </Stack>
                </DialogContent>

                <DialogActions>
                    <Stack direction="row" justifyContent="space-between" width="100%">
                        <Button onClick={handleDialogClose} variant="contained" size="large" color="inherit">
                            キャンセル
                        </Button>
                        <Button onClick={handleDialogClose} variant="contained" size="large" autoFocus>
                            完了
                        </Button>
                    </Stack>
                </DialogActions>
            </Dialog>
        </main>
    );
}
