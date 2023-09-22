import { useTheme } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import ImageIcon from "@mui/icons-material/Image";
import InfoIcon from "@mui/icons-material/Info";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Typography from "@mui/material/Typography";
import { grey } from "@mui/material/colors";
import * as React from "react";

export default function MenuItemPaper({
    name,
    price,
    onClickAddToCart,
    openModal,
}: {
    name: string;
    price: number;
    onClickAddToCart: () => void;
    openModal: () => void;
}) {
    const theme = useTheme();
    return (
        <>
            <ListItem>
                <ListItemAvatar>
                    <Avatar>
                        <ImageIcon />
                    </Avatar>
                </ListItemAvatar>
                <Box>
                    <Typography fontSize={"1.2rem"}>{name}</Typography>
                    <Button
                        size="small"
                        variant="text"
                        sx={{
                            padding: 0,
                            color: grey[500],
                            backgroundColor: "#0000",
                        }}
                        onClick={openModal}
                        startIcon={<InfoIcon />}
                    >
                        アレルゲン
                    </Button>
                </Box>

                <Button
                    size="medium"
                    variant="contained"
                    color="info"
                    onClick={onClickAddToCart}
                    endIcon={<AddShoppingCartIcon />}
                    sx={{ marginLeft: "auto" }}
                >
                    追加
                </Button>
            </ListItem>

            <Divider sx={{ padding: "0 50px" }} component="li" />
        </>
    );
}
