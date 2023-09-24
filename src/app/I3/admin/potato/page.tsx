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

export default function Potato() {
    const reserveList: {
        receptionTime: string;
        qty: number;
        completionTime: string;
    }[] = [
        {
            receptionTime: "10:00",
            qty: 1,
            completionTime: "10:10",
        },
    ];
    return (
        <>
            <AppBar position="fixed" sx={{ top: "auto", bottom: 0, padding: "20px" }}>
                <Typography variant="h4" align="center" sx={{ flexGrow: 1 }}>
                    合計: {reserveList.map((e, sum) => sum + e.qty)}本
                </Typography>
            </AppBar>

            <TableContainer component={Paper}>
                <Table aria-label="simple table">
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
                        {reserveList.map((e, i) => (
                            <ReserveTable key={i} />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}

function ReserveTable() {
    return (
        <TableRow>
            <TableCell>
                <Typography fontSize={"1.7rem"}>{}</Typography>
            </TableCell>
            <TableCell>
                <Typography fontSize={"1.7rem"} align="center">
                    {}本
                </Typography>
            </TableCell>
            <TableCell>
                <Typography fontSize={"1.7rem"} align="center">
                    {}分後
                </Typography>
            </TableCell>
        </TableRow>
    );
}
