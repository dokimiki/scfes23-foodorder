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
            <Paper>
                <Stack direction="row">
                    <Stack direction="column">
                        {order.items.map((e, i) => {
                            return <Chip label={e.id} avatar={<Avatar src="/allergen_ebi.png" />} key={i} />;
                        })}
                    </Stack>
                    <Stack direction="column">
                        <Typography>{order.isMobileOrder ? "モバイル注文" : "店内注文"}</Typography>
                        <Divider />
                        <Typography>番号札: {order.numberTag}</Typography>
                        <Button onClick={onOpenModal}>完了</Button>
                    </Stack>
                </Stack>
            </Paper>
        </>
    );
}
