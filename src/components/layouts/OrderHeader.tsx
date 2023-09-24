/** @jsxImportSource @emotion/react */
import * as React from "react";
import { css } from "@emotion/react";
import Link from "next/link";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import HomeIcon from "@mui/icons-material/Home";

export default function Header({ title }: { title: string }) {
    return (
        <>
            <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <Toolbar sx={{ justifyContent: "center" }}>
                    <div>
                        <Typography variant="h6" component="div">
                            {title}
                        </Typography>
                    </div>
                </Toolbar>
            </AppBar>
            <Toolbar />
        </>
    );
}
