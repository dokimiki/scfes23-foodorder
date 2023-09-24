"use client";
import React from "react";
import SeasoningPaper from "./SeasoningPaper";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { type } from "os";
import { Key } from "@mui/icons-material";
import { seasoning } from "@/libs/types/seasoning";
import { orderContent } from "@/libs/types/orderContent";
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

export default function Page() {
    const seasoningReservations: {
        seasonings: seasoning[];
        orderContents: orderContent;
    }[] = [
        {
            seasonings: [
                {
                    seasoningName: "塩",
                    qty: 1,
                },
                {
                    seasoningName: "コショウ",
                    qty: 1,
                },
            ],
            orderContents: { isMobilOrder: true, orderNumber: 1 },
        },
        {
            seasonings: [
                {
                    seasoningName: "塩",
                    qty: 2,
                },
                {
                    seasoningName: "コショウ",
                    qty: 2,
                },
                {
                    seasoningName: "醤油",
                    qty: 4,
                },
                {
                    seasoningName: "バーベキュー",
                    qty: 1,
                },
            ],
            orderContents: { isMobilOrder: false, orderNumber: 90 },
        },
    ];
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    return (
        <main>
            <AppBar position="sticky" sx={{ marginBottom: "30px" }}>
                <Toolbar>
                    <Typography variant="h4" align="center" sx={{ flexGrow: 1 }}>
                        調味料管理
                    </Typography>
                </Toolbar>
            </AppBar>
            <Box sx={{ width: "100%", maxWidth: 800, bgcolor: "background.paper", margin: "0 auto" }}>
                {seasoningReservations.map((e, i) => (
                    <>
                        <Stack direction="row" justifyContent={"space-between"} alignItems="center">
                            <SeasoningPaper seases={e.seasonings} order={e.orderContents} />
                            <Box width={"20%"} textAlign={"center"}>
                                {e.orderContents.isMobilOrder ? (
                                    <Typography fontSize={"1.2rem"} borderBottom={"1px solid black"} marginTop={"10px"}>
                                        モバイル注文
                                    </Typography>
                                ) : (
                                    <Typography fontSize={"1.2rem"} borderBottom={"1px solid black"} marginTop={"10px"}>
                                        店内注文
                                    </Typography>
                                )}
                                <Typography fontSize={"1.1rem"}>お客様番号 : {e.orderContents.orderNumber}</Typography>
                                <Button variant="contained" size="medium" onClick={handleClickOpen} sx={{ margin: "10px 0" }}>
                                    <Typography fontSize={"1.2rem"}>完了</Typography>
                                    <TaskAltIcon />
                                </Button>
                            </Box>
                        </Stack>
                        <Divider variant="middle" />
                    </>
                ))}
            </Box>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>
                    <Typography>注文を完了しますか？</Typography>
                </DialogTitle>
                <DialogActions>
                    <Button onClick={handleClose}>Disagree</Button>
                    <Button onClick={handleClose} autoFocus>
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>
        </main>
    );
}
