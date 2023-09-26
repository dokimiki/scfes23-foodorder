import * as React from "react";
import { order } from "@/libs/types/order";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";

export default function SeasoningPaper({ order, onOpenModal }: { order: order; onOpenModal: () => void }) {
    return (
        <>
            <Paper elevation={6} sx={{ padding: 2 }}>
                <Stack direction="row" justifyContent="space-between">
                    <Stack direction="row">
                        {order.items.map((e, i) => {
                            return <Chip label={e.id} avatar={<Avatar />} key={i} />;
                        })}
                    </Stack>
                    <Stack direction="column" alignItems="center" sx={{ minWidth: "12rem" }}>
                        <Typography>{order.isMobileOrder ? "モバイル注文" : "店内注文"}</Typography>
                        <Divider sx={{ width: "100%" }} />
                        <Typography variant="h5">番号札: {order.numberTag}</Typography>
                        <Button onClick={onOpenModal} size="large" fullWidth variant="contained">
                            完了
                        </Button>
                    </Stack>
                </Stack>
            </Paper>
        </>
    );
}
