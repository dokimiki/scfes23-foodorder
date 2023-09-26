import * as React from "react";
import Typography from "@mui/material/Typography";
import AllAllergen from "./AllAllergen";
import { AllergensList } from "@/libs/types/allergen";
import { MenuItem } from "@/libs/types/item";
import { Divider, IconButton, Stack } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function AllergenDialogContent({
    allergens,
    itemInfo = { id: "", name: "", price: 0, image: "" },
    onClose,
}: {
    allergens: AllergensList;
    itemInfo?: MenuItem;
    onClose: () => void;
}) {
    return (
        <>
            <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{ padding: "16px 8px 16px 16px", minWidth: "100%", width: "70vw", maxWidth: "600px" }}
            >
                <Stack direction="row" alignItems="baseline" flexWrap="wrap">
                    <Typography variant="inherit" sx={{ fontWeight: "500", fontSize: "1.25rem" }}>
                        {itemInfo.name}
                    </Typography>
                    <Typography variant="body2">のアレルゲン情報</Typography>
                </Stack>
                <IconButton onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            </Stack>
            <Divider />
            <AllAllergen allergens={allergens} />
        </>
    );
}
