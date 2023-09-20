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

export default function MenuItemPaper({ name }: { name: string }) {
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
                    <Avatar sx={{paddingBottom: "5px",}}>
                        <ImageIcon />
                    </Avatar>
                    <InfoIcon fontSize="large" htmlColor="#808080" />
                </ListItemAvatar>
                <ListItemText primary={name} secondary="400円" />
            </ListItem>
            <Divider sx={{padding:"0 100px",}} component="li" />
        </List>
    );
}
