"use client";
import * as React from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import { OrderedPotato } from "@/libs/types/potato";
import Button from "@mui/material/Button";
import Bold from "@/components/Bold";

export function PotatoTable({ orderedPotato, onDone }: { orderedPotato: OrderedPotato; onDone: () => void }) {
    const receptionTime =
        ("00" + orderedPotato.receptionTime.getHours()).slice(-2) + ":" + ("00" + orderedPotato.receptionTime.getMinutes()).slice(-2);
    const completionTime =
        ("00" + orderedPotato.completionTime.getHours()).slice(-2) + ":" + ("00" + orderedPotato.completionTime.getMinutes()).slice(-2);
    return (
        <TableRow>
            <TableCell align="left">
                <Typography fontSize={"1.7rem"}>
                    <Bold>No. {orderedPotato.order.id}</Bold>
                </Typography>
            </TableCell>
            <TableCell align="center" sx={{ background: orderedPotato.order.isMobileOrder ? "#0000" : "#fc6c" }}>
                <Typography fontSize={"1.2rem"}>{orderedPotato.order.isMobileOrder ? "モバイル" : "店内"}</Typography>
            </TableCell>
            <TableCell align="center">
                <Typography fontSize={"1.8rem"} align="center">
                    {orderedPotato.qty}本
                </Typography>
            </TableCell>
            <TableCell align="center">
                <Typography fontSize={"1.5rem"}>{receptionTime}</Typography>
            </TableCell>
            <TableCell align="center">
                <Typography fontSize={"1.5rem"} align="center">
                    {completionTime}
                </Typography>
            </TableCell>
            <TableCell align="center">
                <Button variant="contained" onClick={onDone}>
                    済
                </Button>
            </TableCell>
        </TableRow>
    );
}
