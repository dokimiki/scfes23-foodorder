import * as React from "react";
import { Order } from "@/libs/types/order";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import { MenuItem } from "@/libs/types/item";
import Box from "@mui/material/Box";
import Bold from "@/components/Bold";

export default function SeasoningPaper({ order, menus, onOpenModal }: { order: Order; menus: MenuItem[]; onOpenModal: () => void }) {
    return (
        <>
            <Paper elevation={6} sx={{ padding: 2, margin: "18px 18px 0 18px" }}>
                <Stack direction="row" justifyContent="space-between">
                    <Stack direction="row" alignItems="center">
                        <Typography variant="h5">
                            <Bold>No. {order.id}</Bold>
                        </Typography>
                        <Stack direction="row" flexWrap="wrap">
                            {order.items.map((item, i) => {
                                const menu: MenuItem = menus.find((menu) => menu.id === item.id) || {
                                    id: "",
                                    name: "",
                                    price: 0,
                                    image: "",
                                };
                                return (
                                    <Box
                                        sx={{
                                            borderRadius: "35px",
                                            background: "rgba(0, 0, 0, 0.08)",
                                            display: "flex",
                                            flexDirection: "row",
                                            alignItems: "center",
                                            minWidth: "12rem",
                                            padding: "8px",
                                            margin: "8px",
                                            height: "fit-content",
                                        }}
                                        key={i}
                                    >
                                        <Avatar src={menu.image} sx={{ width: "32px", height: "32px" }} />
                                        <Typography
                                            sx={{
                                                paddingLeft: "0.5rem",
                                            }}
                                        >
                                            {menu.name}
                                            <Bold>x{item.quantity}</Bold>
                                        </Typography>
                                    </Box>
                                );
                            })}
                        </Stack>
                    </Stack>
                    <Stack direction="column" alignItems="center" sx={{ minWidth: "9rem" }}>
                        <Typography>{order.isMobileOrder ? "モバイル注文" : "店内注文"}</Typography>
                        <Divider sx={{ width: "100%" }} />
                        <Typography variant="h5">番号札: {order.numberTag > 0 ? order.numberTag : "なし"}</Typography>
                        <Button onClick={onOpenModal} size="large" fullWidth variant="contained" sx={{ margin: 1 }}>
                            完了
                        </Button>
                    </Stack>
                </Stack>
            </Paper>
        </>
    );
}
