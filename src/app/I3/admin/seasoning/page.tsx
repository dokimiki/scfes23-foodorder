import React from "react";
import SeasoningPaper from "./SeasoningPaper";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { type } from "os";
import { Key } from "@mui/icons-material";
import { seasoning } from "@/libs/types/seasoning";
import { Toolbar } from "@mui/material";
import { orderContent } from "@/libs/types/orderContent";

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
    return (
        <main>
            <AppBar position="sticky" sx={{ marginBottom: "30px" }}>
                <Toolbar>
                    <Typography variant="h4" align="center" sx={{ flexGrow: 1 }}>
                        調味料管理
                    </Typography>
                </Toolbar>
            </AppBar>
            <Box sx={{ width: "1000px", margin: "0 auto" }}>
                {seasoningReservations.map((e, i) => (
                    <>
                        <SeasoningPaper seases={e.seasonings} order={e.orderContents} />
                    </>
                ))}
            </Box>
        </main>
    );
}
