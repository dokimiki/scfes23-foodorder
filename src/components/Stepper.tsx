import * as React from "react";
import { IconButton, Typography, Stack } from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";

export default function Stepper({
    num,
    size = "medium",
    onClickRemove = () => {},
    onClickAdd = () => {},
}: {
    num: number;
    size?: "small" | "medium" | "large";
    onClickRemove?: () => void;
    onClickAdd?: () => void;
}) {
    return (
        <>
            <Stack
                direction="row"
                alignItems="center"
                spacing={1}
                sx={{
                    background: (theme) => theme.palette.common.white,
                    borderRadius: 10,
                    boxShadow: "0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)",
                    width: "fit-content",
                }}
            >
                <IconButton aria-label="remove" onClick={() => onClickRemove()}>
                    <RemoveIcon fontSize={size} />
                </IconButton>
                <Typography variant={size === "small" ? "h6" : size === "medium" ? "h5" : "h4"}>{num}</Typography>
                <IconButton aria-label="add" color="primary" onClick={() => onClickAdd()}>
                    <AddIcon fontSize={size} />
                </IconButton>
            </Stack>
        </>
    );
}
