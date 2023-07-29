import * as React from "react";
import { css } from "@emotion/react";
import Link from "next/link";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Badge from "@mui/material/Badge";

export default function Header({ title, cartUrl, cartItemCount }: { title: string; cartUrl: string; cartItemCount: number }) {
    return (
        <>
            <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <Toolbar sx={{ justifyContent: "space-between" }}>
                    <div
                        css={css`
                            min-width: 48px;
                        `}
                    ></div>
                    <div>
                        <Typography variant="h6" component="div">
                            {title}
                        </Typography>
                    </div>
                    <div
                        css={css`
                            min-width: 48px;
                        `}
                    >
                        <IconButton size="large" color="inherit" component={Link} href={cartUrl}>
                            <Badge badgeContent={cartItemCount} color="error">
                                <ShoppingCartIcon />
                            </Badge>
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
            <Toolbar />
        </>
    );
}
