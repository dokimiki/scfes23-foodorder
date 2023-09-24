import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { seasoning } from "@/libs/types/seasoning";
import { orderContent } from "@/libs/types/orderContent";
import { Stack } from "@mui/material";
import TaskAltIcon from "@mui/icons-material/TaskAlt";

export default function SeasoningPaper({ seases, order }: { seases: seasoning[]; order: orderContent }) {
    return (
        <Box sx={{ width: "100%", maxWidth: 900, bgcolor: "background.paper", margin: "0 auto" }}>
            <Stack display={"grid"} gridTemplateColumns={"1fr 1fr 1fr"}>
                {seases.map((e, i) => (
                    <Content name={e.seasoningName} qty={e.qty} key={i} />
                ))}
            </Stack>
        </Box>
    );
}

function Content({ name, qty }: { name: string; qty: number }) {
    return (
        <Box>
            <Stack direction="row" justifyContent={"center"}>
                <Typography gutterBottom variant="h6" component="div">
                    {name} :
                </Typography>
                <Typography gutterBottom variant="h6" component="div" marginLeft={"5px"}>
                    {qty}
                </Typography>
            </Stack>
        </Box>
    );
}
