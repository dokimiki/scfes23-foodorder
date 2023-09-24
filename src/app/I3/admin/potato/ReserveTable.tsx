"use client";
import * as React from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import { ReserveItem } from "@/libs/types/reserve";

export function ReserveTable({ reserveItem }: { reserveItem: ReserveItem }) {
    const receptionTime =
        ("00" + reserveItem.receptionTime.getHours()).slice(-2) + ":" + ("00" + reserveItem.receptionTime.getMinutes()).slice(-2);
    const completionTime =
        ("00" + reserveItem.completionTime.getHours()).slice(-2) + ":" + ("00" + reserveItem.completionTime.getMinutes()).slice(-2);
    return (
        <TableRow>
            <TableCell align="center">
                <Typography fontSize={"1.7rem"} align="center">
                    {reserveItem.qty}本
                </Typography>
            </TableCell>
            <TableCell align="center">
                <Typography fontSize={"1.7rem"}>{receptionTime}</Typography>
            </TableCell>
            <TableCell align="center">
                <Typography fontSize={"1.7rem"} align="center">
                    {completionTime}
                </Typography>
            </TableCell>
        </TableRow>
    );
}
