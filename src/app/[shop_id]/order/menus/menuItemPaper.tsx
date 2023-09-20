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
import { Directions, ForkLeft, PhotoSizeSelectActual } from "@mui/icons-material";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

export default function MenuItemPaper({ name , price}: { name: string ,price: number}) {
    return (
        <>
            <ListItem>
                <ListItemAvatar>
                    <Avatar>
                        <ImageIcon />
                    </Avatar>
                </ListItemAvatar>
                    
                    <ListItemText primary={name} secondary={price} />
                    <Box sx={{marginLeft: "20px",}}>
                        <Button variant="contained"  disableElevation sx={{boxShadow:"none",}} ><Typography sx={{color: "white"}}>カートに追加</Typography><AddShoppingCartIcon fontSize="small"/></Button>
                        <Button size="medium" sx={{fontSize: "0.7rem",}}>
                            アレルギー情報<InfoIcon fontSize="medium" htmlColor="#FECC4E" />
                        </Button>
                    </Box> 
            </ListItem>

            <Divider sx={{padding:"0 50px",}} component="li" />
        </>
    );
}
