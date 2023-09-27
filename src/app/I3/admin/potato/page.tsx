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
import { Backdrop, CircularProgress, Dialog, Toolbar } from "@mui/material";
import { PotatoTable } from "./PotatoTable";
import { getPotatoData } from "@/libs/apis/admin/Potato";
import { DialogTitle } from "@mui/material";
import { DialogContent } from "@mui/material";
import { DialogActions } from "@mui/material";
import { Button } from "@mui/material";
import { Stack } from "@mui/material";

export default function Potato() {
    const [orderedPotatoList, setOrderedPotatoList] = React.useState<OrderedPotato[]>([]);
    const [isDialogOpen, setIsDialogOpen] = React.useState<boolean>(false);
    const [selectedPotatoId, selectPotatoId] = React.useState<string>("");

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
        <main>
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
                            <TableCell align="left">
                                <Typography fontSize={"1.5rem"}>#</Typography>
                            </TableCell>
                            <TableCell align="center">
                                <Typography fontSize={"1.5rem"}>支払状況</Typography>
                            </TableCell>
                            <TableCell align="center">
                                <Typography fontSize={"1.5rem"}>注文方法</Typography>
                            </TableCell>
                            <TableCell align="center">
                                <Typography fontSize={"1.5rem"} align="center">
                                    本数
                                </Typography>
                            </TableCell>
                            <TableCell align="center">
                                <Typography fontSize={"1.5rem"}>受付時間</Typography>
                            </TableCell>
                            <TableCell align="center">
                                <Typography fontSize={"1.5rem"} align="center">
                                    完成予定
                                </Typography>
                            </TableCell>
                            <TableCell align="center">
                                <Typography fontSize={"1.5rem"} align="center">
                                    ボタン
                                </Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {orderedPotatoList.map((orderedPotato, i) => {
                            return (
                                <PotatoTable
                                    key={i}
                                    orderedPotato={orderedPotato}
                                    onDone={() => {
                                        selectPotatoId(orderedPotato.order.id);
                                        setIsDialogOpen(true);
                                    }}
                                />
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>

            <Toolbar></Toolbar>

            <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
                <DialogTitle id="alert-dialog-title">このポテトは揚げ終わりましたか？</DialogTitle>
                <DialogContent>
                    <Stack direction={"row"} alignItems={"end"} justifyContent={"center"}>
                        <Typography variant="h5" margin={"0 10px 5px 0"}>
                            No.
                        </Typography>
                        <Typography variant="h3" color={"#ff8c00"}>
                            {selectedPotatoId}
                        </Typography>
                    </Stack>
                </DialogContent>

                <DialogActions>
                    <Stack direction="row" justifyContent="space-between" width="100%">
                        <Button onClick={() => setIsDialogOpen(false)} variant="contained" size="large" color="inherit">
                            キャンセル
                        </Button>
                        <Button onClick={() => setIsDialogOpen(false)} variant="contained" size="large" autoFocus>
                            完了
                        </Button>
                    </Stack>
                </DialogActions>
            </Dialog>
        </main>
    );
}
