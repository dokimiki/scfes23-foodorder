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
