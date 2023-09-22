import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import InfoIcon from "@mui/icons-material/Info";
import AllAllergen from "./AllAllergen";

const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 300,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
};

export default function AllergenDialogContent() {
    return (
        <AllAllergen
            allergens={{
                ebi: "NotContains",
                kani: "Contains",
                komugi: "NotContains",
                kurumi: "NotContains",
                milk: "NotContains",
                peanut: "Contamination",
                soba: "NotContains",
                tamago: "NotContains",
            }}
        />
    );
}
