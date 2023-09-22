import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import InfoIcon from "@mui/icons-material/Info";
import AllAllergen from "./AllAllergen";
import { allergensList } from "@/libs/types/allergen";
import { MenuItem } from "@/libs/types/item";
import { DialogTitle } from "@mui/material";

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

export default function AllergenDialogContent({ allergens, itemInfo }: { allergens: allergensList; itemInfo: MenuItem }) {
    return (
        <>
            <DialogTitle>{itemInfo.name}のアレルゲン情報</DialogTitle>
            <AllAllergen allergens={allergens} />
        </>
    );
}
