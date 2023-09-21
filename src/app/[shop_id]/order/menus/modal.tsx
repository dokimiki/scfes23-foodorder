import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import InfoIcon from "@mui/icons-material/Info";
import AllAllergen from "./allergen";

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

export default function AllergenModal() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
            <Box sx={{ textAlign: "left" }}>
                <Button onClick={handleOpen} size="small">
                    <Typography color={"#808080"} fontSize={"0.8rem"} borderBottom={"1px solid #808080"} textAlign={"right"}>
                        商品情報詳細
                    </Typography>
                </Button>
            </Box>
            <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                <Box sx={style}>
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
                </Box>
            </Modal>
        </div>
    );
}
