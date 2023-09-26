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
import DialogContentText from "@mui/material/DialogContentText";
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
    const [dialogOrderId, setDialogOrderId] = React.useState("");

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

    function handleDialogOpen(orderNumber: string) {
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
                    <SeasoningPaper order={e} menus={menus} onOpenModal={() => handleDialogOpen(e.id)} key={i} />
                ))}
            </Stack>

            <Dialog open={open} onClose={handleDialogClose} sx={{ margin: "50px" }}>
                <DialogContentText>注文を完了しますか？</DialogContentText>
                <DialogTitle>
                    <Typography fontSize={"1.2rem"}>お客様番号：</Typography>
                    <Typography fontSize={"1.6rem"}>{}</Typography>
                </DialogTitle>
                <DialogActions>
                    <Button onClick={handleDialogClose}>
                        <Typography color={"red"}>キャンセル</Typography>
                    </Button>
                    <Button onClick={handleDialogClose} autoFocus>
                        <Typography color={"blue"}>完了</Typography>
                    </Button>
                </DialogActions>
            </Dialog>
        </main>
    );
}
