import * as React from "react";
import Typography from "@mui/material/Typography";
import AllAllergen from "./AllAllergen";
import { AllergensList } from "@/libs/types/allergen";
import { MenuItem } from "@/libs/types/item";
import { Backdrop, CircularProgress, Divider, IconButton, Stack } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { getAllergen } from "@/libs/apis/common/Allergen";

export default function AllergenDialogContent({
    itemInfo = { id: "", name: "", price: 0, image: "" },
    onClose,
}: {
    itemInfo?: MenuItem;
    onClose: () => void;
}) {
    const [allergens, setAllergens] = React.useState<AllergensList>();
    const [isAllergenLoading, setIsAllergenLoading] = React.useState(false);

    React.useEffect(() => {
        setIsAllergenLoading(true);
        getAllergen(itemInfo.id)
            .then((res) => {
                setAllergens(res);
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setIsAllergenLoading(false);
            });
    }, [itemInfo]);

    if (isAllergenLoading || allergens === undefined) {
        return (
            <main>
                <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={true}>
                    <CircularProgress color="inherit" />
                </Backdrop>
            </main>
        );
    }

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
