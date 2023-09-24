import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

function createData(reception_time: string, quant: number, completion_time: number) {
    return {
        reception_time,
        quant,
        completion_time,
    };
}

const rows = [createData("11:20", 159, 6.0)];

export default function Potato() {
    const reception_time = ["11:20", "11:25", "12:34", "10", "10", "10", "10", "10", "10", "10", "10", "10"];
    const quant = [3, 4, 2, 10, 10, 10, 10, 10, 10, 10, 10, 10]; //商品の数量
    const completion_time = [1, 10, 30, 10, 10, 10, 10, 10, 10, 10, 10, 10];
    const total_quant = quant.reduce((a, b) => a + b);
    const total_completion_time = completion_time.reduce((a, b) => a + b);
    return (
        <TableContainer component={Paper}>
            <Table sx={{ width: 700, margin: "50px auto 0 auto" }} aria-label="simple table">
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
                                完成時間(目安)
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
                                    {completion_time[i]}分
                                </Typography>
                            </TableCell>
                        </TableRow>
                    ))}
                    <TableRow>
                        <TableCell>
                            <Typography fontSize={"1.7rem"}>合計:</Typography>
                        </TableCell>
                        <TableCell>
                            <Typography fontSize={"1.7rem"} align="center">
                                {total_quant}本
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography fontSize={"1.7rem"} align="center">
                                {total_completion_time}分
                            </Typography>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
}
