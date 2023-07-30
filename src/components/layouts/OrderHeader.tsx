import * as React from "react";
import { css } from "@emotion/react";
import Link from "next/link";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import Badge from "@mui/material/Badge";
import Tooltip from "@mui/material/Tooltip";

export default function Header({ title, menuLink, cartLink, cartItemCount }: { title: string; menuLink: string; cartLink: string; cartItemCount: number }) {
    return (
        <>
            <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <Toolbar sx={{ justifyContent: "space-between" }}>
                    <div>
                        <span
                            css={css`
                                position: relative;
                                &::after {
                                    content: "メニュー";
                                    text-align: center;
                                    position: absolute;
                                    top: 2.5em;
                                    left: 0;
                                    right: 0;
                                    margin: auto;
                                    font-size: 0.6em;
                                }
                            `}
                        >
                            <IconButton size="large" color="inherit" component={Link} href={menuLink}>
                                <MenuBookIcon />
                            </IconButton>
                        </span>
                    </div>
                    <div>
                        <Typography variant="h6" component="div">
                            {title}
                        </Typography>
                    </div>
                    <div>
                        <span
                            css={css`
                                position: relative;
                                &::after {
                                    content: "カート";
                                    text-align: center;
                                    position: absolute;
                                    top: 2.5em;
                                    left: 0;
                                    right: 0;
                                    margin: auto;
                                    font-size: 0.6em;
                                }
                            `}
                        >
                            <IconButton size="large" color="inherit" component={Link} href={cartLink}>
                                <Badge badgeContent={cartItemCount} color="error">
                                    <ShoppingCartIcon />
                                </Badge>
                            </IconButton>
                        </span>
                    </div>
                </Toolbar>
            </AppBar>
            <Toolbar />
        </>
    );
}
