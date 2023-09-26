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
import { OrderedPotato } from "@/libs/types/potato";
import { Backdrop, CircularProgress, Toolbar } from "@mui/material";
import { css } from "@emotion/react";
import { PotatoTable } from "./PotatoTable";
import { getPotatoData } from "@/libs/apis/admin/Potato";

export default function Potato() {
    const [orderedPotatoList, setOrderedPotatoList] = React.useState<OrderedPotato[]>([]);

    React.useEffect(() => {
        getPotatoData()
            .then((res) => {
                setOrderedPotatoList(res);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    if (orderedPotatoList.length <= 0) {
        return (
            <main>
                <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={true}>
                    <CircularProgress color="inherit" />
                </Backdrop>
            </main>
        );
    }

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
                        {orderedPotatoList.reduce((sum, e) => {
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
                        {orderedPotatoList.map((orderedPotato, i) => {
                            return <PotatoTable key={i} orderedPotato={orderedPotato} />;
                        })}
                    </TableBody>
                </Table>
            </TableContainer>

            <Toolbar></Toolbar>
        </main>
    );
}
