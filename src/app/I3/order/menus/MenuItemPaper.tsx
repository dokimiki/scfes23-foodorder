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
import { MenuItem } from "@/libs/types/item";

export default function MenuItemPaper({
    menu,
    onClickAddToCart,
    openModal,
}: {
    menu: MenuItem;
    onClickAddToCart: () => void;
    openModal: () => void;
}) {
    const theme = useTheme();
    return (
        <>
            <ListItem sx={{ paddingX: 0 }}>
                <ListItemAvatar>
                    <Avatar src={menu.image} sx={{ height: "3.5rem", width: "3.5rem", marginRight: "8px" }} />
                </ListItemAvatar>
                <Box>
                    <Typography fontSize={"1.2rem"}>{menu.name}</Typography>
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
                        アレルゲン情報
                    </Button>
                </Box>

                <Button
                    size="medium"
                    variant="contained"
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
