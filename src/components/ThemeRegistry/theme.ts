import { Roboto, Noto_Sans_JP } from "next/font/google";
import { createTheme } from "@mui/material/styles";
import { grey, amber } from "@mui/material/colors";

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
        primary: {
            light: amber[300],
            main: amber[400],
            dark: amber[700],
        },
        background: {
            default: grey[200],
            paper: grey[200],
        },
    },
    typography: {
        fontFamily: [notoSans.style.fontFamily, roboto.style.fontFamily, "Helvetica", "Arial", "sans-serif"].join(","),
    },
});

export default theme;
