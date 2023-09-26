/** @jsxImportSource @emotion/react **/
"use client";

import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import AppBar from "@mui/material/AppBar";
import { ReserveItem } from "@/libs/types/reserve";
import { Toolbar } from "@mui/material";
import { css } from "@emotion/react";
import { ReserveTable } from "./ReserveTable";
import { getPotatoDate } from "@/libs/apis/admin/Potato";
import { Key } from "@mui/icons-material";

export default function Potato() {
    const reserveLists: ReserveItem[] = Array(20)
        .fill(1)
        .map((e, i) => {
            let data: ReserveItem = {
                receptionTime: new Date(new Date("2023/9/30 10:00").setMinutes(i * 5)),
                completionTime: new Date(new Date("2023/9/30 10:00").setMinutes(i * 5 + 10)),
                qty: ((i * 39) % 4) + 1,
            };
            return data;
        });

    return (
        <main
            css={css`
                margin: 16px;
            `}
        >
            <AppBar position="fixed" sx={{ top: "auto", bottom: 0 }}>
                <Toolbar>
                    <Typography variant="h4" align="center" sx={{ flexGrow: 1 }}>
                        合計:
                        {reserveLists.reduce((sum, e) => {
                            return sum + e.qty;
                        }, 0)}
                        本
                    </Typography>
                </Toolbar>
            </AppBar>

            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">
                                <Typography fontSize={"1.7rem"} align="center">
                                    本数
                                </Typography>
                            </TableCell>
                            <TableCell align="center">
                                <Typography fontSize={"1.7rem"}>受付時間</Typography>
                            </TableCell>
                            <TableCell align="center">
                                <Typography fontSize={"1.7rem"} align="center">
                                    完成予定時間
                                </Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        <ReserveTable
                            reserveItem={() => {
                                const data = getPotatoDate()
                                    .then(() => {
                                        data.map((e) => {
                                            return e;
                                        });
                                    })
                                    .catch(() => {
                                        console.log("error");
                                    });
                            }}
                        />
                    </TableBody>
                </Table>
            </TableContainer>

            <Toolbar></Toolbar>
        </main>
    );
}
