"use client";
import { Paper, Stack } from "@mui/material";
import { useBarcode } from "next-barcode";

export default function Completed() {
    const barcode = Array.from({ length: 24 }, () => Math.floor(Math.random() * 10)).join("");
    const { inputRef } = useBarcode({
        value: barcode,
        options: {
            text: barcode.split("").reduce((str, char, i) => {
                return str + char + (i % 4 === 3 ? " " : "");
            }, ""),
            fontSize: 16,
            background: "#00000000",
        },
    });

    return (
        <>
            <div>
                <Paper
                    elevation={3}
                    sx={{
                        width: "100%",
                        padding: 2,
                        background: "white",
                        position: "relative",
                        zIndex: "1201",
                        borderRadius: "0 0 8px 8px",
                    }}
                >
                    <Stack alignItems="center">
                        <svg ref={inputRef} />
                    </Stack>
                </Paper>
            </div>
            <main>
                <h1>注文完了</h1>
            </main>
        </>
    );
}
