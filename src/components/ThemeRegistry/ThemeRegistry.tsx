"use client";
import * as React from "react";
import { ThemeProvider } from "@mui/material/styles";
import { SnackbarProvider } from "notistack";
import CssBaseline from "@mui/material/CssBaseline";
import NextAppDirEmotionCacheProvider from "./EmotionCache";
import theme from "./theme";

export default function ThemeRegistry({ children }: { children: React.ReactNode }) {
    return (
        <NextAppDirEmotionCacheProvider options={{ key: "mui" }}>
            <ThemeProvider theme={theme}>
                <SnackbarProvider maxSnack={4} autoHideDuration={2500} />
                {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                <CssBaseline />
                {children}
            </ThemeProvider>
        </NextAppDirEmotionCacheProvider>
    );
}
