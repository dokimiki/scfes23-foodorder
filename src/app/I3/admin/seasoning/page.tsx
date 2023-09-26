"use client";
import React from "react";
import SeasoningPaper from "./SeasoningPaper";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Stack } from "@mui/material";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Toolbar from "@mui/material/Toolbar";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { MenuItem } from "@/libs/types/item";
import { getMenuItems } from "@/libs/Items";
import { order } from "@/libs/types/order";

function getOrderedCarts(): order[] {
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

    const orders: order[] = getOrderedCarts();

    return (
        <main>
            <AppBar position="fixed">
                <Toolbar>
                    <Typography variant="h4" align="center" sx={{ flexGrow: 1 }}>
                        調味料管理
                    </Typography>
                </Toolbar>
            </AppBar>
            <Toolbar />

            <Stack>
                {orders.map((e, i) => (
                    <SeasoningPaper order={e} onOpenModal={() => handleDialogOpen(e.id)} key={i} />
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
