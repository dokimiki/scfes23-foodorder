"use client";
// メニュー一覧ページ
import * as React from "react";
import { css } from "@emotion/react";
import { Global } from "@emotion/react";
import { styled } from "@mui/material/styles";
import { grey } from "@mui/material/colors";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Badge from "@mui/material/Badge";
import Stack from "@mui/material/Stack";

import Link from "next/link"; //仮置き

const drawerBleeding = 68.5;

const StyledBox = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "light" ? "#fff" : grey[800],
}));

const Puller = styled(Box)(({ theme }) => ({
    width: 30,
    height: 6,
    backgroundColor: theme.palette.mode === "light" ? grey[300] : grey[900],
    borderRadius: 3,
    position: "absolute",
    top: 8,
    left: "calc(50% - 15px)",
}));

export default function Menus() {
    const [open, setOpen] = React.useState(false);

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };

    return (
        <main
            css={css`
                margin-bottom: calc(${drawerBleeding}px + 1em);
            `}
        >
            <Global
                styles={{
                    ".MuiDrawer-root > .MuiPaper-root": {
                        height: `calc(50% - ${drawerBleeding}px)`,
                        overflow: "visible",
                    },
                }}
            />
            <Link href="/I3/order/menus/[menu_id].tsx">メニュー詳細（仮置き）</Link><br></br>
            <Link href="/I3/order/confirm" >注文確認ページ（仮置き）</Link>
            <h1>メニュー一覧</h1>
            <p>hello react</p>

            <SwipeableDrawer
                anchor="bottom"
                open={open}
                onClose={toggleDrawer(false)}
                onOpen={toggleDrawer(true)}
                swipeAreaWidth={drawerBleeding}
                disableSwipeToOpen={false}
                ModalProps={{
                    keepMounted: true,
                }}
            >
                <StyledBox
                    sx={{
                        position: "absolute",
                        top: -drawerBleeding,
                        borderTopLeftRadius: 8,
                        borderTopRightRadius: 8,
                        visibility: "visible",
                        right: 0,
                        left: 0,
                    }}
                >
                    <Puller />
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Stack direction="row" alignItems="baseline" sx={{ marginLeft: 2 }}>
                            <Badge badgeContent={2} color="error" sx={{ marginRight: 2 }}>
                                <ShoppingCartIcon sx={{ marginBottom: "0.2em" }} />
                            </Badge>
                            <Typography variant="h6" sx={{ color: "text.secondary" }}>
                                ￥
                            </Typography>
                            <Typography variant="h4">300</Typography>
                        </Stack>
                        <Button variant="contained" sx={{ margin: 2 }}>
                            注文する
                        </Button>
                    </Stack>
                </StyledBox>
                <StyledBox
                    sx={{
                        px: 2,
                        pb: 2,
                        height: "100%",
                        overflow: "auto",
                    }}
                >
                    <Skeleton variant="rectangular" height="100%" />
                </StyledBox>
            </SwipeableDrawer>
        </main>
    );
}
