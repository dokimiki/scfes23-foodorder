import * as React from "react";
import { css } from "@emotion/react";
import Link from "next/link";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import HomeIcon from "@mui/icons-material/Home";

export default function Header({ title, homeLink }: { title: string; homeLink: string }) {
    return (
        <>
            <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <Toolbar sx={{ justifyContent: "space-between" }}>
                    <div>
                        <span
                            css={css`
                                position: relative;
                                &::after {
                                    content: "ホーム";
                                    text-align: center;
                                    position: absolute;
                                    top: 2.3em;
                                    left: 0;
                                    right: 0;
                                    margin: auto;
                                    font-size: 0.6em;
                                }
                            `}
                        >
                            <IconButton size="large" color="inherit" component={Link} href={homeLink}>
                                <HomeIcon sx={{ marginBottom: "0.2em" }} />
                            </IconButton>
                        </span>
                    </div>
                    <div>
                        <Typography variant="h6" component="div">
                            {title}
                        </Typography>
                    </div>
                    <div
                        css={css`
                            width: 48px;
                        `}
                    ></div>
                </Toolbar>
            </AppBar>
            <Toolbar />
        </>
    );
}
