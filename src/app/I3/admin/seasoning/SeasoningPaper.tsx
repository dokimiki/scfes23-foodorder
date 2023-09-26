import * as React from "react";
import { Order } from "@/libs/types/order";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import { MenuItem } from "@/libs/types/item";

export default function SeasoningPaper({ order, menus, onOpenModal }: { order: Order; menus: MenuItem[]; onOpenModal: () => void }) {
    return (
        <>
            <Paper elevation={6} sx={{ padding: 2, margin: "18px 18px 0 18px" }}>
                <Stack direction="row" justifyContent="space-between">
                    <Stack direction="row" spacing={1}>
                        {order.items.map((item, i) => {
                            const menuName = menus.find((menu) => menu.id === item.id)?.name;
                            return <Chip label={menuName} avatar={<Avatar />} key={i} sx={{ width: 3, height: 3 }} />;
                        })}
                    </Stack>
                    <Stack direction="column" alignItems="center" sx={{ minWidth: "9rem" }}>
                        <Typography>{order.isMobileOrder ? "モバイル注文" : "店内注文"}</Typography>
                        <Divider sx={{ width: "100%" }} />
                        <Typography variant="h5">番号札: {order.numberTag}</Typography>
                        <Button onClick={onOpenModal} size="large" fullWidth variant="contained" sx={{ margin: 1 }}>
                            完了
                        </Button>
                    </Stack>
                </Stack>
            </Paper>
        </>
    );
}
