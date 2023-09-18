import Image from "next/image";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

const allergenColor = {
    Contains: "#ed9b9b",
    Contamination: "#ffeb81",
    NotContains: "#00000000",
};

export default function AllAllergen() {
    let allergensList: { name: string; img: string; contamination: "NotContains" | "Contamination" | "Contains" }[] = [
        { name: "えび", img: "/img/allergen_ebi.png", contamination: "Contains" },
        { name: "かに", img: "/img/allergen_kani.png", contamination: "NotContains" },
        { name: "小麦", img: "/img/allergen_komugi.png", contamination: "Contamination" },
        { name: "そば", img: "/img/allergen_soba.png", contamination: "NotContains" },
        { name: "卵", img: "/img/allergen_tamago.png", contamination: "Contains" },
        { name: "ミルク", img: "/img/allergen_milk.png", contamination: "NotContains" },
        { name: "落花生", img: "/img/allergen_peanuts.png", contamination: "NotContains" },
        { name: "クルミ", img: "/img/allergen_kurumi.png", contamination: "NotContains" },
    ];
    return (
        <>
            <TableContainer component={Paper}>
                <Table aria-label="simple table" sx={{ width: "100%" }}>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">品名</TableCell>
                            <TableCell align="left">混入状況</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {allergensList.map((e, i) => (
                            <TableRow
                                sx={{ "&:last-child td, &:last-child th": { border: 0 }, background: allergenColor[e.contamination] }}
                                key={i}
                            >
                                <TableCell align="center" component="th" scope="row">
                                    <Stack alignItems="center">
                                        <Image alt="" src={e.img} width={50} height={50} />
                                        <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                                            {e.name}
                                        </Typography>
                                    </Stack>
                                </TableCell>
                                <TableCell align="left">
                                    <Typography
                                        variant="subtitle1"
                                        sx={{ fontWeight: e.contamination === "NotContains" ? "normal" : "bold" }}
                                    >
                                        {e.contamination === "Contains"
                                            ? "含まれている"
                                            : e.contamination === "Contamination"
                                            ? "同じ工場で生産している"
                                            : "含んでいない"}
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}
