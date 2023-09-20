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
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';

export default function MenuItemPaper({ name , price}: { name: string ,price: number}) {
    return (
        <List
            sx={{
                width: "100%",
                maxWidth: 360,
                bgcolor: "background.paper",
            }}
        >
            <ListItem>
                <ListItemAvatar>
                    <Avatar>
                        <ImageIcon />
                    </Avatar>
                </ListItemAvatar>
                <ListItem sx={{display: "flex",flexDirection:"colum",padding:"0 20px",}}>
                    <Typography>{name}</Typography>
                    <Typography>{price}円</Typography>
                    <Button size="medium">
                        アレルギー情報<InfoIcon fontSize="medium" htmlColor="#FECC4E" />
                    </Button> 
                </ListItem>
            </ListItem>
            <Divider sx={{padding:"0 50px",}} component="li" />
        </List>
    );
}
