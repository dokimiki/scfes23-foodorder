import * as React from "react";
import style from "./style.module.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ImageIcon from "@mui/icons-material/Image";
import WorkIcon from "@mui/icons-material/Work";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import Divider from "@mui/material/Divider";
import InfoIcon from "@mui/icons-material/Info";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import { Directions, PhotoSizeSelectActual } from "@mui/icons-material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import AllergenModal from "./modal";

export default function MenuItemPaper({ name, price, onClickAddToCart }: { name: string; price: number; onClickAddToCart: () => void }) {
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
                    <Button size="small">
                    <Typography color={"#808080"} fontSize={"0.8rem"} borderBottom={"1px solid #808080"} textAlign={"right"}>
                        商品情報詳細
                    </Typography>
                </Button>
                    <AllergenModal />
                </Box>

                <Box sx={{ marginLeft: "auto" }}>
                    <Button size="medium" variant="contained" color="info" onClick={onClickAddToCart} disableElevation endIcon={<AddShoppingCartIcon />} sx={{ boxShadow: "none" }} >
                        <Typography color={"#EEE"}>追加 </Typography>
                    </Button>
                </Box>
            </ListItem>

            <Divider sx={{ padding: "0 50px" }} component="li" />
        </>
    );
}
