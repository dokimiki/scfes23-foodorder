import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";

export default function Potato() {
    const reception_time = ["11:20", "11:25", "12:34", "10", "10", "10", "10", "10", "10", "10", "10", "10", "10"];
    const quant = [3, 4, 2, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10]; //商品の数量
    const completion_time = [1, 10, 30, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10];
    const total_quant = quant.reduce((a, b) => a + b);
    return (
        <>
            <AppBar position="fixed">
                <Toolbar>
                    <Typography variant="h4" align="center" sx={{ flexGrow: 1 }}>
                        合計: {total_quant}本
                    </Typography>
                </Toolbar>
            </AppBar>

            <TableContainer component={Paper}>
                <Table sx={{ width: 700, margin: "80px auto 0 auto" }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <Typography fontSize={"1.7rem"}>受付時間</Typography>
                            </TableCell>
                            <TableCell align="left">
                                <Typography fontSize={"1.7rem"} align="center">
                                    本数
                                </Typography>
                            </TableCell>
                            <TableCell align="left">
                                <Typography fontSize={"1.7rem"} align="center">
                                    完成予定時間
                                </Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {reception_time.map((e, i) => (
                            <TableRow>
                                <TableCell>
                                    <Typography fontSize={"1.7rem"}>{e}</Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography fontSize={"1.7rem"} align="center">
                                        {quant[i]}本
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography fontSize={"1.7rem"} align="center">
                                        {completion_time[i]}分後
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}
