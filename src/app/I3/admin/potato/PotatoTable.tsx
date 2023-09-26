"use client";
import * as React from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import { OrderedPotato } from "@/libs/types/potato";

export function PotatoTable({ orderedPotato }: { orderedPotato: OrderedPotato }) {
    const receptionTime =
        ("00" + orderedPotato.receptionTime.getHours()).slice(-2) + ":" + ("00" + orderedPotato.receptionTime.getMinutes()).slice(-2);
    const completionTime =
        ("00" + orderedPotato.completionTime.getHours()).slice(-2) + ":" + ("00" + orderedPotato.completionTime.getMinutes()).slice(-2);
    return (
        <TableRow>
            <TableCell align="center">
                <Typography fontSize={"1.7rem"} align="center">
                    {orderedPotato.qty}本
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
