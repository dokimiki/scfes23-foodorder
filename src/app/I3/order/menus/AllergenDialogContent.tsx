import * as React from "react";
import Typography from "@mui/material/Typography";
import AllAllergen from "./AllAllergen";
import { allergensList } from "@/libs/types/allergen";
import { MenuItem } from "@/libs/types/item";
import { DialogTitle } from "@mui/material";

export default function AllergenDialogContent({
    allergens,
    itemInfo = { id: "", name: "", price: 0, image: "" },
}: {
    allergens: allergensList;
    itemInfo?: MenuItem;
}) {
    return (
        <>
            <DialogTitle>
                {itemInfo.name}
                <Typography variant="body1">のアレルゲン情報</Typography>
            </DialogTitle>
            <AllAllergen allergens={allergens} />
        </>
    );
}
