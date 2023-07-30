import { Roboto, Noto_Sans_JP } from "next/font/google";
import { createTheme } from "@mui/material/styles";

const roboto = Roboto({
    weight: ["300", "400", "500", "700"],
    subsets: ["latin"],
    display: "swap",
});

const notoSans = Noto_Sans_JP({
    weight: ["300", "400", "500", "700"],
    subsets: ["latin"],
    display: "swap",
});

const theme = createTheme({
    palette: {
        mode: "light",
    },
    typography: {
        fontFamily: [notoSans.style.fontFamily, roboto.style.fontFamily, "Helvetica", "Arial", "sans-serif"].join(","),
    },
});

export default theme;
